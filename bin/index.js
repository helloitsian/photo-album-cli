#!/usr/bin/env node 

import axios from 'axios';
import boxen from "boxen";
import chalk from "chalk";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// constants
const apiBaseUrl = "https://jsonplaceholder.typicode.com/photos";

const statusMessages = {
  success: chalk.greenBright.bold("Success!"),
  error: chalk.redBright.bold('Error!')
}

const photoLabels = {
  title: 'Title =>',
  url: 'Url =>',
  thumbnail: 'Thumbnail =>'
}

// fetch photos from jsonplaceholder
export const fetchPhotos = async (albumId) => {
  const albumRequest = await axios.get(`${apiBaseUrl}?albumId=${albumId}`);
  if (albumRequest.status === 200)
    return albumRequest.data;
  else
    return [];
}

// apply styling to photo labels we want to display
export const createPhotoLabels = () => {
  const titleLabel = chalk.bold.blue(photoLabels.title);
  const urlLabel = chalk.bold.blue(photoLabels.url)
  const thumbnailLabel = chalk.bold.blue(photoLabels.thumbnail);

  return {
    titleLabel,
    urlLabel,
    thumbnailLabel,
  }
}

// apply colors to photo values we want to display
export const formatPhotoValues = (photo) => {
  const title = chalk.whiteBright(`"${photo.title}"`);
  const url = chalk.whiteBright(`"${photo.url}"`);
  const thumbnail = chalk.whiteBright(photo.thumbnailUrl);

  return {
    title,
    url,
    thumbnail,
  }
}

// box options for boxen
const createPhotoOutputBoxOptions = (photo) => ({
  title: `Album[${photo.albumId}] - Photo[${photo.id}]`,
  titleAlignment: "center",
  padding: 1,
  borderColor: "green",
  borderStyle: 'round',
})

// create formatted photo info output
const createPhotoOutput = (
  photo,
  { titleLabel, urlLabel, thumbnailLabel }, 
  { title, url, thumbnail }
) => (
  boxen(
    `${titleLabel} ${title}\n${urlLabel} ${url}\n${thumbnailLabel} ${thumbnail}`,
    createPhotoOutputBoxOptions(photo)
  )
)

// loops through photos array and print formatted output to console.
const displayPhotosInfo = (photos) => {
  photos.forEach((photo) => {
    const labels = createPhotoLabels();
    const formattedValues = formatPhotoValues(photo);
    const output = createPhotoOutput(photo, labels, formattedValues);
    
    console.log(output);
  });
};

// handler for yargs "getphotos" command
const getAlbumHandler = (argv) => {
  const { albumId } = argv;

  console.log(chalk.blueBright.bold(`Fetching album photos for album Id: ${albumId}...`));
  
  fetchPhotos(albumId)
    .then((photos) => {
      console.log(statusMessages.success)
      displayPhotosInfo(photos);
      console.log(`Loaded ${photos.length} photos from album ${albumId}`)
    })
    .catch((err) => {
      console.error(statusMessages.error);
      console.error(err);
    })
}

// yargs init for handling command arguments
yargs(hideBin(process.argv)).command(
  "album [albumId]",
  "fetch photos of album",
  (yargs) => {
    return yargs.positional("albumId", {
      describe: "Album Id to query photos by.",
      default: 1,
    });
  },
  getAlbumHandler,
).parse();