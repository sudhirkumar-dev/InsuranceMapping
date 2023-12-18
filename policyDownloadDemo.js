const handleDownload = async () => {
    try {
      let policyId = req?.profile?.customer?.applicationId;
      let provider = request.provider.ProviderName;
      console.log(req, 'reqq');
  
      if (download === '') {
        switch (provider) {
          case 'HDFC':
            const hdfcResponse = await axios.post(`${api}/hdfc/v1/generate/Policy/doc`, request);
  
            if (hdfcResponse?.data?.statusCode === 400) {
              alert('Error in HDFC download API');
            } else {
              const schedulePath = hdfcResponse?.data?.schedulePath;
              const pdfResponse = await axios.get(schedulePath, { responseType: 'arraybuffer' });
  
              const blob = new Blob([pdfResponse.data], { type: 'application/pdf' });
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
            }
            break;
  
          case 'GODIGIT':
            const godigitResponse = await axios.post(`${api}/insurance/v1/car/policy/pdf`, { policyId });
  
            if (godigitResponse?.data?.statusCode === 400) {
              alert('Error in GoDigit download API');
            } else {
              req.profile.customer.policyStatus = 'COM';
              setDownload(godigitResponse?.data?.schedulePath);
              window.location.href = godigitResponse?.data?.schedulePath;
            }
            break;
  
          default:
            // Handle other providers if needed
            break;
        }
      } else {
        window.location.href = download;
      }
    } catch (error) {
      console.error('Error in handleDownload:', error);
    }
  };
  