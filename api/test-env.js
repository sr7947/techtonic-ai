export default async function handler(req, res) {
  const envKeys = Object.keys(process.env).map(key => {
    return {
      key,
      defined: !!process.env[key],
      length: process.env[key] ? process.env[key].length : 0
    };
  });
  return res.status(200).json({ envKeys });
}
