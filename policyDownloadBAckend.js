exports.generatePolicyDoc = async (request) => {
    const envConfig = await env.getEnvParameters();
    let requestBody = request.body;
    try {
      let buffer = {};
      let header = { ...envConfig.hdfc.headers };
      try {
        let token = await getAuthenticationToken();
        header.Token = await token?.body?.Authentication?.Token;
      } catch (err) {
        console.log(err, 'error in authentication token api');
      }
      header['PRODUCT_CODE'] = 2311;
      let response = await axios({
        ...allowLegacyRenegotiationforNodeJsOptions,
        url: envConfig.hdfc.pdurl,
        headers: header,
        method: 'POST',
        data: requestBody
      });
      console.log('********response of HDFC ******', response);
      const pdfBytes = response.data.Resp_Policy_Document.PDF_BYTES;
      const pdfBuffer = Buffer.from(pdfBytes, 'base64');
      const filePath = 'D:/lmv-customerId.pdf';
      fs.writeFileSync(filePath, pdfBuffer);
      console.log('PDF converted and saved successfully');
   
      buffer = {
        statusCode: 200,
        body: 'PDF converted and saved successfully',
        filePath: filePath,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="lmv-customerId.pdf"'
        }
      };
      return buffer;
    } catch (error) {
      console.log('### Error response', error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'System Error while calling: ' + envConfig.hdfc.pdurl + '. Error Details: ' + error + '. policy Document Service Request: ' + JSON.stringify(requestBody)
        })
      };
    }
  };