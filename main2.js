// import frontEndData from "/frontEndDataWithAddons.json";
import frontEndData from "/individual.json";

const createPartyDOList = (membersData, healthData, proposerData, ckycNum) => {
  let currentGuidNumber = 6237992;
  const resultArray = [];
  const relationMapping = {
    spouse: "SPSE",
    son: "SONM",
    father: "FATH",
    mother: "MOTH",
    daughter: "UDTR",
    self: "SELF",
  };

  const commonAddress = {
    pinCode: proposerData.pincode,
    emailAddress: proposerData.email,
    contactNum: proposerData.mobile,
  };

  const createPartyObject = (member, healthDataOfPerson, roleCd) => {
    currentGuidNumber += 1;
    const guid = `QN${currentGuidNumber}`;
    const partyObject = {
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
          areaCd: "vizianagaram",
          cityCd: "vizianagaram",
          stateCd: "Andhra Pradesh",
          pinCode: commonAddress.pinCode,
        },
        {
          addressLine1Lang1: "5678",
          addressLine2Lang1: "Secondary Street",
          addressTypeCd: "COMMUNICATION",
          areaCd: "vizianagaram",
          cityCd: "vizianagaram",
          pinCode: commonAddress.pinCode,
          stateCd: "Andhra Pradesh",
        },
      ],
      partyContactDOList: [
        {
          contactNum: commonAddress.contactNum,
          contactTypeCd: "MOBILE",
          stdCode: "+91",
        },
      ],
      partyEmailDOList: [
        {
          emailAddress: commonAddress.emailAddress,
          emailTypeCd: "PERSONAL",
        },
      ],
      partyIdentityDOList: [
        {
          identityTypeCd: "PAN",
        },
      ],
      partyQuestionDOList: healthDataOfPerson,
      relationCd: relationMapping[member.relationship],
      roleCd: roleCd,
      titleCd: member.title.toUpperCase(),
    };

    if (roleCd === "PROPOSER") {
      partyObject.ckyc = "YES";
      partyObject.ckycNumber = ckycNum;
      partyObject.guid = resultArray.find(
        (item) => item.relationCd === "SELF"
      )?.guid;
    }

    return partyObject;
  };

  resultArray.push(
    ...Object.keys(membersData).map((key) => {
      const member = membersData[key];
      const healthDataOfPerson =
        healthData.find((item) => item.hasOwnProperty(key))?.[key] || [];
      return createPartyObject(member, healthDataOfPerson, "PRIMARY");
    })
  );

  const proposerPartyObject = {
    dob: proposerData.birthDate,
    firstName: proposerData.firstname,
    gender: proposerData.gender,
    lastName: proposerData.lastname,
    title: proposerData.selftitle,
    relationship: "self",
  };
  const proposerHealthDataArrayForPerson =
    healthData.find((data) => data.hasOwnProperty("self"))?.["self"] || [];
  const proposer = createPartyObject(
    proposerPartyObject,
    proposerHealthDataArrayForPerson,
    "PROPOSER"
  );
  resultArray.push(proposer);

  return resultArray;
};

const createPostData = (
  membersData,
  dataForAPI,
  premiumPostBody,
  proposerData,
  ckycNum,
  nomineeData
) => {
  console.log(nomineeData);
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
    Individual:"INDIVIDUAL",
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
        partyDOList: createPartyDOList(
          membersData,
          dataForAPI,
          proposerData,
          ckycNum
        ),
        policyAdditionalFieldsDOList: [
          {
            field1: nomineeData.nomineeName,
            field10: nomineeData.nomineeDob,
            field12: nomineeData.relation,
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
  frontEndData["proposerData"],
  frontEndData["ckycNum"],
  frontEndData["nomineeData"]
);

console.log(postData);
