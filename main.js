import frontEndData from '/frontEndData.json';
console.log(frontEndData["membersData"], 'data');

const keyMapping = {
  diabetes: {
      questionSetCd: 'PEDdiabetesDetails',
      questionCd: '205',
      existing:"diabetesExistingSince"
  },
  hyperTension: {
      questionSetCd: 'PEDhyperTensionDetails',
      questionCd: '207',
      existing:"hyperTensionExistingSince"
  },
  liver: {
      questionSetCd: 'PEDliverDetails',
      questionCd: '232',
      existing:"liverExistingSince"
  },
  cancer: {
      questionSetCd: 'PEDcancerDetails',
      questionCd: '114',
      existing:"cancerExistingSince"
  },
  cardiac: {
      questionSetCd: 'PEDcardiacDetails',
      questionCd: '143',
      existing:"cardiacExistingSince"
  },
  jointPain: {
      questionSetCd: 'PEDjointpainDetails',
      questionCd: '105',
      existing:"jointpainExistingSince",
  },
  kidney: {
      questionSetCd: 'PEDkidneyDetails',
      questionCd: '129',
      existing:"kidneyExistingSince",
  },
  paralysis: {
      questionSetCd: 'PEDparalysisDetails',
      questionCd: '164',
      existing:"paralysisExistingSince"
  },
  congenital: {
      questionSetCd: 'PEDcongenitalDetails',
      questionCd: '122',
      existing:"congenitalExistingSince"
  },
  hivAids: {
      questionSetCd: 'PEDHivaidsDetails',
      questionCd: '147',
      existing:"hivaidsExistingSince"
  },
  hospitalized: {
      questionSetCd: 'HEDHealthHospitalized',
      questionCd: 'H001',
  },
  healthClaim: {
      questionSetCd: 'HEDHealthClaim',
      questionCd: 'H002',
  },
  healthDeclined: {
      questionSetCd: 'HEDHealthDeclined',
      questionCd: 'H003',
  },
  healthCovered: {
      questionSetCd: 'HEDHealthCovered',
      questionCd: 'H004',
  },
  otherDetails: {
      questionSetCd: 'PEDotherDetails',
      questionCd: '210',
      existing:"otherExistingSince"
  },
  respiratory: {
      questionSetCd: 'PEDRespiratoryDetails',
      questionCd: '250',
      existing:"respiratoryExistingSince"
  },
  endo: {
      questionSetCd: 'PEDEndoDetails',
      questionCd: '222',
      existing:"EndocriExistingSince"
  },
  illness: {
      questionSetCd: 'PEDillnessDetails',
      questionCd: '502',
      existing:'illnessExistingSince'
  },
  surgery: {
      questionSetCd: 'PEDSurgeryDetails',
      questionCd: '503',
      existing:"SurgeryExistingSince"
  },
  smokeDetails: {
      questionSetCd: 'PEDSmokeDetails',
      questionCd: '504',
      existing:"SmokeExistingSince"
  },
};


function createPartyDoList(membersData, healthData) {
  const partyDoList = [];
  function createPartyQuestionList(memberDetails) {
    const questionList = [];
    let addedPedExistsRecord = false;
    for (const category in memberDetails.pedDetails) {
      let pedExists = memberDetails.checked;
        const categoryDetails = memberDetails.pedDetails[category];
        for(const key in keyMapping){
          if(keyMapping[key].questionSetCd === category){
            let code = keyMapping[key].questionCd;
            let categoryChecked = categoryDetails.checked;
            let pedSince = categoryDetails.since;
            let existingSince = keyMapping[key].existing;
            questionList.push({
                questionSetCd:category,
                questionCd:code  === undefined ? "" : code,
                response:categoryChecked
            })
            questionList.push({
              questionSetCd:category,
              questionCd:existingSince === undefined ? "" : existingSince,
              response:pedSince 
            });
            if(!addedPedExistsRecord){
              questionList.push({
                questionSetCd: 'yesNoExist',
                questionCd: 'pedYesNo',
                response: pedExists
              });
              addedPedExistsRecord=true;
            }
          }
        }
    }
    console.log(questionList)
    return questionList;
}

  for (const memberType in membersData) {
    const members = membersData[memberType];
    const healthDetails = healthData[memberType];

    if (Array.isArray(members)) {
      for (const [index, member] of members.entries()) {
        const partyMember = {
          "birthDt": member.dob,
          "firstName": member.firstName,
          "genderCd": member.gender,
          "lastName": member.lastName,
          "ckycNumber": frontEndData.ckycNum,
          "titleCd": member.title,
          "relationCd": member.relationship,
          "roleCd": member.role || "PROPOSER",
          "ckyc": "YES",
          "ekyc": "",
          "ekycRefNo": "",
          "ovdkyc": "",
          "partyAddressDOList": [
            {
              "addressLine1Lang1": "1206",
              "addressLine2Lang1": "Maruthi nagar",
              "addressTypeCd": "PERMANENT",
              "areaCd": "Nalgonda",
              "cityCd": "Nalgonda",
              "stateCd": "ANDHRA PRADESH",
              "pinCode": "560072"
            },
            {
              "addressLine1Lang1": "1206",
              "addressLine2Lang1": "Maruthi nagar",
              "addressTypeCd": "COMMUNICATION",
              "areaCd": "Nalgonda",
              "cityCd": "Nalgonda",
              "pinCode": "560072",
              "stateCd": "ANDHRA PRADESH"
            }
          ],
          "partyContactDOList": [
            {
              "contactNum": "9892398089",
              "contactTypeCd": "MOBILE",
              "stdCode": "+91"
            }
          ],
          "partyEmailDOList": [
            {
              "emailAddress": "karan.churi@workindia.in",
              "emailTypeCd": "PERSONAL"
            }
          ],
          "partyIdentityDOList": [
            {
              "identityTypeCd": "PAN"
            }
          ],
          "partyQuestionDOList": createPartyQuestionList(healthDetails),
        };

        partyDoList.push(partyMember);
      }
    } else {
      const partyMember = {
        "birthDt": members.dob,
        "firstName": members.firstName,
        "genderCd": members.gender,
        "lastName": members.lastName,
        "ckycNumber": frontEndData.ckycNum,
        "titleCd": members.title,
        "relationCd": members.relationship,
        "roleCd": members.role || "PRIMARY",
        "ckyc": "YES",
        "ekyc": "",
        "ekycRefNo": "",
        "ovdkyc": "",
        "partyAddressDOList": [
          {
            "addressLine1Lang1": "1206",
            "addressLine2Lang1": "Maruthi nagar",
            "addressTypeCd": "PERMANENT",
            "areaCd": "Nalgonda",
            "cityCd": "Nalgonda",
            "stateCd": "ANDHRA PRADESH",
            "pinCode": "560072"
          },
          {
            "addressLine1Lang1": "1206",
            "addressLine2Lang1": "Maruthi nagar",
            "addressTypeCd": "COMMUNICATION",
            "areaCd": "Nalgonda",
            "cityCd": "Nalgonda",
            "pinCode": "560072",
            "stateCd": "ANDHRA PRADESH"
          }
        ],
        "partyContactDOList": [
          {
            "contactNum": "9892398089",
            "contactTypeCd": "MOBILE",
            "stdCode": "+91"
          }
        ],
        "partyEmailDOList": [
          {
            "emailAddress": "karan.churi@workindia.in",
            "emailTypeCd": "PERSONAL"
          }
        ],
        "partyIdentityDOList": [
          {
            "identityTypeCd": "PAN"
          }
        ],
        "partyQuestionDOList": createPartyQuestionList(healthDetails),
      };

      partyDoList.push(partyMember);
    }
  }

  return partyDoList;
}

// Assuming healthData is provided in the correct structure
const partyDoList = createPartyDoList(frontEndData["membersData"], frontEndData["dataForAPI"]);
console.log("partyDolist",partyDoList);
