
import { describe, it } from 'mocha'
import chai from 'chai';
import { 
  fetchPhotos, 
  createPhotoLabels,
  formatPhotoValues,
} from '../bin/index.js';

const expect = chai.expect;

const samplePhoto = {
  "albumId": 3,
  "id": 101,
  "title": "incidunt alias vel enim",
  "url": "https://via.placeholder.com/600/e743b",
  "thumbnailUrl": "https://via.placeholder.com/150/e743b"
};

describe("Requests", () => {
  describe("Fetch Album Photos", () => {
    it("fetches photos of given album id from endpoint", () => {
      fetchPhotos(1)
        .then((photos) => {
          expect(photos)
            .to.be.a('array')
        })
    })
  })
})

describe("Console Formatting", () => {
  describe("Create Photo Labels", () => {
    it("creates photo labels and applies console stylings to them", () => {
      const labels = createPhotoLabels();
      expect(labels).to.be.a('object');
      expect(labels).to.have.property('titleLabel')
      expect(labels).to.have.property('urlLabel')
      expect(labels).to.have.property('thumbnailLabel')
    })
  })

  describe("Format Photo Values", () => {
    it("applies console stylings to photo values", () => {
      const formattedValues = formatPhotoValues(samplePhoto);
      expect(formattedValues).to.be.a('object');
      expect(formattedValues).to.have.property('title')
      expect(formattedValues).to.have.property('url')
      expect(formattedValues).to.have.property('thumbnail')
    })
  })
})