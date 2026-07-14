import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// import { parseSanctionsText } from "../utils/ParseSanctionsText";
import { parseSanctionsTextJSON } from "../utils/Utils";

// 1️ Create context
const SanctionsContext = createContext(null);

// 2 Provider
export const SanctionsProvider = ({ children }) => {
  const [sanctions, setSanctions] = useState([]);
  const [sanctionObjArr, setsanctionObjArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ═════════════════════════════ Refresh before calling APi ════════════════════════════════════ //
  // Logic : to prevent duplication of data in sanctions state
  useEffect(() => {
    fetchSanctions();
  }, []);

  // ════════════════════════════════════════════ APi call ═════════════════════════════════════════ //
  /* Logic : This is a simple method that just makes the APi call and uses the parser to get array of object of the form 
[
{
    "id": 1,
    "originalName": "Ashaq Hussain Nengroo",
    "lowerCaseName": "ashaq hussain nengroo"
},
{
    "id": 1,
    "originalName": "Ashaq Hussain Nengroo",
    "lowerCaseName": "ashaq hussain nengroo"
} ]

I have choosen this form to supplement my search logic throughout the project.
I dont have to traverse through the entire array once again to conevrt the sanctions to lower case , 
hence accomodating the lowercase with the existing time complexity of the parsing function form utils , 
    */

  const fetchSanctions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://data.opensanctions.org/datasets/20260214/in_mha_banned/names.txt",
        // { responseType: "text" },
      );
      // console.log(JSON.stringify(response));
      // const parsed = parseSanctionsText(response.data);
      const parsedObjectArray = parseSanctionsTextJSON(response.data);
      // console.log(parsedObjectArray);
      // setSanctions(parsed);
      setsanctionObjArr(parsedObjectArray);
    } catch (err) {
      setError("Failed to load sanctions list");
    } finally {
      setLoading(false);
    }
  };

  // attaching the final results to the provider
  return (
    <SanctionsContext.Provider
      value={{
        sanctionObjArr,
        loading,
        error,
        refresh: fetchSanctions,
      }}
    >
      {children}
    </SanctionsContext.Provider>
  );
};

//3 hook - to use this SanctionsContext and also give warning about use outside the context

export const useSanctions = () => {
  const context = useContext(SanctionsContext);

  if (!context) {
    throw new Error("useSanctions must be used inside SanctionsProvider");
  }

  return context;
};
