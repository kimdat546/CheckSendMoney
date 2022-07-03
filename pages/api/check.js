
import GmailAPI from "../../src/GmailAPI"
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await GmailAPI.readInboxContent(req.body.transid)
      console.log(req.body.transid)
      res.status(200).json({ result: response })
    } catch (error) {
      res.status(500).json({ error: `Internal server errors: ${error}` })
    }
  } else {
    res.status(200).json({ message: "Hello datga" })
  }

}
