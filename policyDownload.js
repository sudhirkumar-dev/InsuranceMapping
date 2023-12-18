const handleDownload = () => {
    let policyId = req?.profile?.customer?.applicationId;
    console.log(req, 'reqq');
    if (download == '') {
      // Check some condition to determine which API to call
      if (download == '') {
        axios
          .post(`${api}/hdfc/v1/generate/Policy/doc`, request)
          // Replace with your HDFC API endpoint
          .then((res) => {
            console.log('clicked policy download and response', res);
            let obj = { ...req };
            console.log('ressssss', res);
            // if (res?.data?.statusCode == 400) {
            //   alert('Error in download API');
            // } else {
            //   const schedulePath = res?.data?.schedulePath;
            //   // Trigger a download using anchor element
            //   const anchor = document.createElement('a');
            //   anchor.href = schedulePath;
            //   anchor.download = 'lmv-customerId.pdf'; // Set the desired filename
            //   anchor.style.display = 'none';
            //   document.body.appendChild(anchor);
            //   anchor.click();
            //   document.body.removeChild(anchor);
 
            //   req.profile.customer.policyStatus = 'COM';
            //   setDownload(res?.data?.schedulePath);
            //   obj.profile.customer.pdfLink = res?.data?.schedulePath;
            //   AddToLocalStorage('globalObj', obj);
            //   window.location.href = res?.data?.schedulePath;
            // }
            if (res?.data?.statusCode === 400) {
              alert('Error in download API');
            } else {
              const schedulePath = res?.data?.schedulePath;
              // Fetch the PDF content
              return axios.get(schedulePath, { responseType: 'arraybuffer' });
            }
          })
          .then((response) => {
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
 
            // Trigger a download using anchor element
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'lmv-customerId.pdf'; // Set the desired filename
            anchor.style.display = 'none';
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
 
            req.profile.customer.policyStatus = 'COM';
            setDownload(url);
            // obj.profile.customer.pdfLink = url;
            // AddToLocalStorage('globalObj', obj);
          })
          .catch((err) => {
            console.log('error in download', err);
          });
      } else {
        axios
          .post(`${api}/insurance/v1/car/policy/pdf`, { policyId }) // Your original API call
          .then((res) => {
            console.log('clicked policy download and response', res);
            let obj = { ...req };
            console.log('ressssss', res);
            if (res?.data?.statusCode == 400) {
              alert('Error in download API');
            } else {
              req.profile.customer.policyStatus = 'COM';
              setDownload(res?.data?.schedulePath);
              obj.profile.customer.pdfLink = res?.data?.schedulePath;
              AddToLocalStorage('globalObj', obj);
              window.location.href = res?.data?.schedulePath;
            }
          })
          .catch((err) => {
            console.log('error in download', err);
          });
      }
    } else {
      window.location.href = download;
    }
  };