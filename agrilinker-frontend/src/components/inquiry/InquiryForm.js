/* useEffect(() => {
    const fetchInquiries = async () => {
      try {
        if (!farmerEmail) {
          setError("Please log in to view inquiries.");
          setLoading(false);
          return; 
        }

        const res = await axios.get(
          `http://localhost:8081/api/inquiries/farmer/${encodeURIComponent(farmerEmail)}`,
        );
        setInquiries(res.data);
      } catch (err) {
        console.error("Axios Error:", err);
        setError("Failed to load inquiries.");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [farmerEmail]);
  */
