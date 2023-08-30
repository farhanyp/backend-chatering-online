import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
  data: Buffer,        // Data gambar dalam bentuk BLOB
  contentType: String, // Jenis konten gambar (e.g., "image/jpeg", "image/png")
});

const Image = mongoose.model('Image', imageSchema);

export {Image};
