import { getVerifiedUser } from "../../utils/utils.js";
import * as interpretationDAO from "./interpretationDAO.js";
export default function interpretationRoutes(app) {


app.post('/interpretations',getVerifiedUser, async (req, res) => {
  const user_Id = req.user.id;
  console.log("User ID: ", req.body);
  const username = req.user.name;
  const { interpretation, song_id } = req.body;

  try{
    const newInterpretation = await interpretationDAO.createInterpretation(user_Id,username, interpretation,song_id);
    res.json(newInterpretation);
  }
  catch(error){
    res.status(500).json({error: error.message});
  }
});
}

