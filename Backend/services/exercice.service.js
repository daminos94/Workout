import axios from 'axios'


export const fetchFromExerciceDB = async (url) => {
    const options = {
      params: {
        limit: '100',
        offset: '0'
      },
        headers: {
          'x-rapidapi-key': '3be222b490mshbc940c3c1f0d30ep17f587jsne35a5d68fe62',
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
      };

      const response = await axios.get(url, options)

      if(response.status !== 200) {
        throw new Error('Failed to fetch data from ExerciceDB' + response.statusText)
      }

      return response.data
}