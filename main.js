import frontEndData from "/frontEndData.json";
console.log(frontEndData["membersData"],frontEndData["dataForAPI"], "data");

const createPartyDOList = (membersData,healthData) => {
  return Object.keys(membersData).map((key, index) => {
    const member = membersData[key];
    console.log(key,"key")
    const healthDataOfPerson = healthData.find(item=>item[key]);
    console.log(healthDataOfPerson[key])
    return {
      birthDt: member.dob,
      firstName: member.firstName,
      genderCd: member.gender,
      lastName: member.lastName,
      partyAddressDOList: [
        {
          addressLine1Lang1: "1234",
          addressLine2Lang1: "Main Street",
          addressTypeCd: "PERMANENT",
          areaCd: "Some Area",
          cityCd: "City",
          stateCd: "STATE",
          pinCode: "123456",
        },
        {
          addressLine1Lang1: "5678",
          addressLine2Lang1: "Secondary Street",
          addressTypeCd: "COMMUNICATION",
          areaCd: "Another Area",
          cityCd: "City",
          pinCode: "543216",
          stateCd: "STATE",
        },
      ],
      partyContactDOList: [
        {
          contactNum: "9876543210",
          contactTypeCd: "MOBILE",
          stdCode: "+91",
        },
      ],
      partyEmailDOList: [
        {
          emailAddress: "john.doe@example.com",
          emailTypeCd: "PERSONAL",
        },
      ],
      partyIdentityDOList: [
        {
          identityTypeCd: "AADHAAR",
        },
      ],
      partyQuestionDOList:healthDataOfPerson[key]
    };
  });
};

const partyDOList = createPartyDOList(frontEndData["membersData"],frontEndData["dataForAPI"]);

const postData = {
  intPolicyDataIO: {
    policy: {
      partyDOList: partyDOList,
    },
  },
};

// const partyDoList = createPartyDoList(frontEndData["membersData"], frontEndData["dataForAPI"]);
console.log(postData);
