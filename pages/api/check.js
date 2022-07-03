
import GmailAPI from "../../src/GmailAPI"
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      if (req?.body) {
        const response = await GmailAPI.readInboxContent(req?.body?.transid)
        console.log(req?.body?.transid)
        res.status(200).json({ result: response })
      }
      res.status(50).json({ error: "req.body invalid" })
    } catch (error) {
      res.status(500).json({ error: `Internal server errors: ${error}` })
    }
  } else {
    res.status(200).json({ message: "Hello datga" })
  }

}
