import { submitComment } from "@/services";
import { useEffect, useRef, useState } from "react";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();
  const nameEl = useRef();

  useEffect(() => {
    storeDataEl.current.checked = true;
    commentEl.current.value = "";
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const handleCommentSubmission = () => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commendObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      console.log(storeData, name, email);
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commendObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave A Comment
      </h3>
      <div className="grid grid-cols-1 lg:w-full gap-4 mb-4">
        <textarea
          ref={commentEl}
          placeholder="Comment"
          name="Comment"
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-700 resize-none"
        ></textarea>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          placeholder="Name"
          name="Name"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-700 resize-none"
        ></input>

        <input
          type="email"
          ref={emailEl}
          placeholder="Email"
          name="Email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-700 resize-none"
        ></input>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            value={true}
          />
          <label
            className="text-gray-500 cursor-pointer ml-2 text-xs"
            htmlFor="storeData"
          >
            Save my name and email for next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required.</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Commment submitted for review!
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
