import { db, storage } from './firebase';

// KYC API

export const doUploadForm = (name, file) =>
  storage.ref().child(name).put(file, { contentType: file.type })

export const doUploadDocument = (name, file) =>
  storage.ref().child(name).put(file, { contentType: file.type })
