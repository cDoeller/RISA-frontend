import React, { useEffect, useState } from "react";
import newsService from "../services/news.service";
import NewsContainer from "../components/NewsContainer";
import { Link } from "react-router-dom";
import "../styles/styles-pages/NewsPage.css";

function NewsPage() {
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    newsService
      .getAllNews()
      .then((response) => {
        console.log(response.data);
        setNewsData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="page-wrapper">
      {newsData && (
        <>
          <div className="newspage-wrapper flex-column">
            <div className="newspage-segment-wrapper flex-column">
              <p> Most Recent:</p>
              <NewsContainer active={true} newsData={newsData[0]} index={0} />
            </div>
            <div className="newspage-segment-wrapper flex-column">
              <p> News Archive:</p>
              <section className="flex-column-right landing-page-news-section">
                {newsData.slice(1).map((newsDocument, index) => {
                  return (
                    <NewsContainer
                      active={false}
                      key={newsDocument._id}
                      newsData={newsDocument}
                      index={index}
                    />
                  );
                })}
              </section>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NewsPage;
