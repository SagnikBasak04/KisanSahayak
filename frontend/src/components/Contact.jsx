import { useState } from "react";
import useSendEmail from "../hooks/useSendEmail";
import Spinner from "../components/Spinner";

const Contact = () => {
  const [inputs, setInputs] = useState({
    mail: "",
    message: ""
  });
  const { loading, email } = useSendEmail();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    await email(inputs);
    setInputs({
      mail: "",
      message: ""
    })
  }

  return (
    <div className="contact-page-wrapper" id="contact-id">
      <h1 className="primary-heading">Have Question In Mind?</h1>
      <h1 className="primary-text font-semibold text-4xl">Let Us Help You</h1>
      <form onSubmit={handleEmailSubmit}>
        <div className="contact-form-container">
          <input
            type="text"
            placeholder="yourmail@gmail.com"
            value={inputs.mail}
            onChange={(e) => setInputs({ ...inputs, mail: e.target.value })}
          />
          <textarea
            type="text"
            placeholder="write your question here"
            cols="30"
            rows="10"
            value={inputs.message}
            onChange={(e) => setInputs({ ...inputs, message: e.target.value })}
            className="border-none outline-none resize-none"
          />
          {loading ? <Spinner /> : <button className="secondary-button-contact">Submit</button>}
        </div>
      </form>

    </div>
  );
};

export default Contact;