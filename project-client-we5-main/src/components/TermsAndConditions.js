import { useEffect, useState } from "react";
import { GET } from "../api/util";
import LoadingSkeleton from "../controls/LoadingSkeleton";

const TermsAndConditions = () => {
  const [terms, setTerms] = useState([]);
  const [loadingTerms, setLoadingTerms] = useState(false);
  const loadTermsAndConditions = async () => {
    setLoadingTerms(true);
    try {
      const resp = await GET("/termsAndConditions");
      setTerms(resp);
    } catch (error) {
      setTerms([]);
    }
    setLoadingTerms(false);
  };
  useEffect(() => {
    loadTermsAndConditions();
  }, []);
  return (
    <div>
      <h2>Terms & Conditions</h2>
      {loadingTerms ? (
        <>
          <LoadingSkeleton variant="rect" width={"70%"} height={60} />
          <LoadingSkeleton variant="rect" width={"70%"} height={30} />
          <LoadingSkeleton variant="rect" width={"70%"} height={60} />
          <LoadingSkeleton variant="rect" width={"70%"} height={30} />
        </>
      ) : (
        <>
          {terms?.map((term) => {
            return <div style={{ marginTop: 30 }}>{term}</div>;
          })}
        </>
      )}
    </div>
  );
};

export default TermsAndConditions;
