const tf = require('@tensorflow/tfjs-node');
const inputError = require('../exceptions/inputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const label = confidenceScore > 50 ? 'Cancer' : 'Non-cancer';
    let suggestion;

    if (label === 'Cancer') {
      suggestion = 'Segera periksa ke dokter!';
    }

    if (label === 'Non-cancer') {
      suggestion = 'Penyakit kanker tidak terdeteksi.';
    }

    return { label, suggestion };
  } catch (error) {
    throw new inputError('Terjadi kesalahan dalam melakukan prediksi');
  }
}

module.exports = predictClassification;