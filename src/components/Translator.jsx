import { useState } from "react";
import './translator.css';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios'
import Loading from "./Loading";

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [outputLang, setOutputLang] = useState('ig');
  const [outputText, setOutputText] = useState('');
  const [isTranslated, setIsTranslated] = useState();
  const [loading, setLoading] = useState(false);

  const translate = async () => {
    setLoading(true)
    console.log(outputLang, inputText);
    const options = {
      method: 'POST',
      url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
      params: {
        'to[0]': outputLang,
        'api-version': '3.0',
        profanityAction: 'NoAction',
        textType: 'plain'
      },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'enter your api key here',
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
      },
      data: [
        {
          Text: inputText
        }
      ]
    };

    try {
      const response = await axios.request(options);
      if (response.status !== 200) {
        setIsTranslated(false);
        setLoading(false)
        console.log("there's an error");
        return;
      }
      setIsTranslated(true);
      setLoading(false)
      const data = response.data
      const translatedText = data[0].translations[0].text;
      setOutputText(translatedText);
      console.log(translatedText);
      console.log(data[0].detectedLanguage.language);
    } catch (error) {
      setIsTranslated(false);
      setLoading(false)
      console.error(error);
    }

  }

  const clearInput = () => {
    setInputText('');
    setOutputText('');
    setIsTranslated();
  }

  return (
    <section className="ntughari">
      <div className="row-wrapper">
        <div className="ntughari-akpa ntinye-asusu">
          <div className="top-row">
            <button
              className="btn btn-primary btn-translate"
              onClick={translate}
            >
              sụgharịa
            </button>
          </div>
          <form className="ntinye-form">
            <textarea
              className="text-box"
              placeholder="De ba asusu gi"
              onChange={e => setInputText(e.target.value)}
              value={inputText}
            >
            </textarea>
            {
              inputText !== "" &&
              <AiOutlineClose
                className="icon-btn mechia-btn"
                onClick={clearInput}
              />
            }
          </form>
        </div>
        <div className="ntughari-akpa ntinye-asusu">
          <div className="top-row">
            <select
              name="language"
              id="language"
              className="form-select form-select-sm"
              onChange={e => setOutputLang(e.target.value)}
            >
              <option value="ig">Igbo</option>
              <option value="ha">Hausa</option>
              <option value="yo">Yoruba</option>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          {loading ?
            <p className="text-box output-box">
            <Loading />
            </p>
            :
            <p className="text-box output-box">
              {
                isTranslated === false ?
                  <span className="output-placeholder translation-error">Translation failed</span>
                  :
                  outputText === "" ?
                    <span className="output-placeholder">họrọ asụsụ</span>
                    :
                    outputText
              }
            </p>
          }


        </div>
      </div>
    </section>
  );
}

export default Translator;