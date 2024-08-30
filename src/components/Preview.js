import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../api/BookApi";
import { Previewer } from "pagedjs";
// import styles from "./Preview.module.css";

const BookPreview = () => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBookData = async () => {
      try {
        const fetchedBook = await fetchBookById(bookId);
        setBookData(fetchedBook);
      } catch (error) {
        setError("Error fetching book data. Please try again later.");
        console.error("Error fetching book data:", error);
      }
    };

    getBookData();
  }, [bookId]);

  useEffect(() => {
    if (bookData) {
      // Create a detached element (not in the DOM)
      const tempContainer = document.createElement("div");

      // Dynamically build the content
      const content = `
          <h1 class="font-bold text-center">${bookData.title}</h1>
          <p class="text-center mb-4">${bookData.description}</p>
          ${bookData.chapters
            .map(
              (chapter) => `
            <div class="chapter break-before-page">
              <h2 class="font-bold">${chapter.title}</h2>
              ${chapter.sections
                .map(
                  (section) => `
                <div class="section my-4">
                  <div>${section.content}</div>
                </div>
              `,
                )
                .join("")}
            </div>
          `,
            )
            .join("")}
        `;

      // Insert content into the temporary container
      tempContainer.innerHTML = content;

      // Paged.js to paginate the content
      const paged = new Previewer();

      const cssstring = `@media print {h2 {break-after: avoid;} @page {size: a3; background: orange; margin: 20mm 10mm; @bottom-center { content: counter(page)}}}`;

      paged.preview(
        tempContainer,
        ["/preview.css"],
        document.querySelector("#output"),
      );
      // .then((flow) => {
      //   // Clear the original content in the #book element
      //   const bookElement = document.getElementById("book");
      //   bookElement.innerHTML = "";

      //   // // Insert paginated content into the #book element
      //   // flow.pages.forEach((page) => {
      //   //   bookElement.appendChild(page.element);
      //   // });

      //   console.log("Rendered book preview!");
      // })
      // .catch((error) => {
      //   console.error("Error rendering book preview:", error);
      // });
    }
  }, [bookData]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!bookData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div id="book" className="text-base leading-relaxed"></div>
      <div id="output"></div>
    </div>
  );
};

export default BookPreview;
