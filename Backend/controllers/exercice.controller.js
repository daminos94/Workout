import { fetchFromExerciceDB } from "../services/exercice.service.js";


export async function getBodyPart(req, res) {
    try {
        const response = await fetchFromExerciceDB("https://exercisedb.p.rapidapi.com/exercises/bodyPartList");

        res.json({success: true, content: response });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
};

export async function getExercicesByBodyPart(req, res) {
    const { bodyPart } = req.params;

    try {
        const response = await fetchFromExerciceDB(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`);
        const bodyweightExercises = response.filter(
            (exercise) => exercise.equipment === "body weight"
        );
        res.json({ success: true, exercises: bodyweightExercises });
    } catch (error) {
        console.error("Error fetching body parts:", error);
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
};