import frontEndData from "/individual.json";
console.log(frontEndData["membersData"], frontEndData["dataForAPI"], "data");

const createPartyDOList = (membersData, healthData) => {

  let currentGuidNumber = 6237992;
  return Object.keys(membersData).map((key) => {
    const member = membersData[key];
    const healthDataOfPerson = healthData.find((item) => item[key]);
    const relationMapping = {
      spouse: "SPSE",
      son: "SONM",
      father: "FATH",
      monther: "MOTH",
      daughter: "UDTR",
      self: "SELF",
    };
    currentGuidNumber += 1;
    const guid = `QN${currentGuidNumber}`;
    return {
      birthDt: member.dob,
      firstName: member.firstName,
      genderCd: member.gender,
      guid: guid,
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
          identityTypeCd: "PAN",
        },
      ],
      partyQuestionDOList: healthDataOfPerson[key],
      relationCd: relationMapping[member.relationship],
      roleCd: "PRIMARY",
      titleCd: member.title,
    };
  });
};

const createPostData = (
  membersData,
  dataForAPI,
  premiumPostBody,
  proposerData
) => {

  const premiumCodes = {
    field_AHC: "AHCS1144",
    field_OPD: "COPD1211",
    field_IC: "ICS1149",
    field_CS: "CS1154",
  };
  const mandatoryCodes = ["AACS1147", "WBS1146", "NCBS1145"];
  const resultArray = mandatoryCodes.concat(
    Object.keys(premiumPostBody)
      .filter((key) => premiumPostBody[key] === "1" && premiumCodes[key])
      .map((key) => premiumCodes[key])
  );
  var resultString = resultArray.join(",");

  const tenureMapping = {
    "1 Year": "1",
    "2 Year": "2",
    "3 Year": "3",
  };
  const FAMILYFLOATER = {
    5: "022",
    7: "018",
    10: "026",
    15: "028",
    25: "030",
    50: "032",
    100: "034",
  };
  const coverMapping = {
    Floater: "FAMILYFLOATER",
    
  };
  const productMapping = {
    2397: "12001002",
    2401: "10001107",
    5367: "10001117",
  };
  return {
    intPolicyDataIO: {
      policy: {
        businessTypeCd: "NEWBUSINESS",
        baseProductId: productMapping[premiumPostBody.productId],
        baseAgentId: "20008325",
        coverType: coverMapping[premiumPostBody.policyType],
        partyDOList: createPartyDOList(membersData, dataForAPI, proposerData),
        policyAdditionalFieldsDOList: [
          {
            field1: "PARTNERNAME",
            field10: "xc",
            field12: "SISTER-IN-LAW",
            fieldAgree: "YES",
            fieldAlerts: "YES",
            fieldTc: "YES",
          },
        ],
        sumInsured: FAMILYFLOATER[premiumPostBody.selectedCoverage],
        term: tenureMapping[premiumPostBody.tenure],
        isPremiumCalculation: "YES",
        addOns: resultString,
      },
    },
  };
};

const postData = createPostData(
  frontEndData["membersData"],
  frontEndData["dataForAPI"],
  frontEndData["premiumPostBody"],
  frontEndData["proposerData"]
);

console.log(postData);
