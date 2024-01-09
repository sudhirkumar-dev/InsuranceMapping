import QuotationFrontEnd from "./HDFC/QuotationFrontEnd.json";

const createQuoteReqObjHDFC = (data) => {
  let sum = {
    5: 500000,
    10: 1000000,
    20: 2000000,
    25: 2500000,
    50: 5000000,
    100: 10000000,
    200: 20000000,
  };
  const tenureMapping = {
    "1 Year": "1",
    "2 Year": "2",
    "3 Year": "3",
  };
  let policyType = data?.policyType === "Individual" ? "Individual" : "Family";
  let familyAgesArray = data?.familyAges || [];
  familyAgesArray?.unshift(data?.highestElderAge);
  console.log(familyAgesArray);
  const noOfPeople = parseInt(data?.noOfPeople - data?.noOfChildren);
  const totalPeople = parseInt(data?.noOfPeople);
  const noOfChildren = parseInt(data?.noOfChildren);
  const familyString = `${noOfPeople}A+${noOfChildren}C`;
  console.log(data);
  const currentDate = new Date();
  const formattedDate = `${currentDate
    .getDate()
    .toString()
    .padStart(2, "0")}/${(currentDate?.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${currentDate?.getFullYear()}`;

  const memberDetailsList = [];

  for (let i = 0; i < totalPeople; i++) {
    console.log(familyAgesArray[i]);
    const birthYear = currentDate?.getFullYear() - familyAgesArray[i];
    const day = familyAgesArray[i]?.padStart(2, "0");
    const birthDate = `${day}/06/${birthYear}`;

    const insuredObject = {
      Insured_Salutation: "",
      Insured_DateOfBirth: birthDate,
      Insured_Name: "MANGESH SINGH",
      Insured_Relation: "Self",
      Insured_Gender: "M",
      Insured_MaritalStatus: "Married",
      Insured_Dependent: "No",
      Insured_OccupationID: "",
      Insured_HeightINcms: 160.0,
      Insured_WeightINkgs: 60.0,
      Insured_Profession: "OCCUP_ADAS_CD",
      Insured_Nationality: "Indian",
      Insured_ResidenceStatus: "Indian",
      Insured_PortabilityApplicable: "No",
      Insured_CriticalIllnessAddonCover_SumInsured:
        Number(familyAgesArray[i]) > 18 ? data["HDFC_criticalIllness"] : 0,
      Insured_HospitalCashAddonCover_SumInsured: data["HDFC_hospitalAddons"],
      Insured_CriticalIllnessAddonCover_PlanType: "PLAN1",
      IsUnlimitedRestore: false,
      Insured_AnnualIncome: 1000000.0,
      Insured_SumInsured: 0.0,
      AppointeName: "",
      AppointeRelation: "",
      AppointeAddress: "",
      Insured_Qualification: "EDU_QUAL_BA",
      MedicalQuestionnaire: [],
      memberLifeStylelist: [],
    };
    memberDetailsList?.push(insuredObject);
  }

  return {
    ApplicationNumber: null,
    TransactionID: "TXOS00967834",
    GoGreen: false,
    Policy_Details: {
      PolicyStartDate: formattedDate,
      ProposalDate: formattedDate,
      BusinessType_Mandatary: "New Business",
      PolicyEndDate: null,
      EndorsementEffectiveDate: null,
      SumInsured: sum[data["selectedCoverage"]],
      Premium: 0.0,
      EXEMPTED_KERALA_FLOOD_CESS: null,
      CUSTOMER_STATE_CD: 0,
      TXT_GIR_NO: null,
      PolicyType: policyType,
      FamilyType: familyString,
      TypeofPlan: "Optima Secure",
      PolicyTenure: tenureMapping[data["tenure"]],
      Deductible: 0.0,
    },
    Request_Data_OS: {
      AppNumber: null,
      isProspectModified: "No",
      isCustomerModified: "No",
      ChannelName: "Dummy",
      IsEmiOpted: 0,
      PaymentFrequency: "SINGLE",
      Other_Details: {
        LGCode: "",
        SPCode: "",
        NomineeRelation: "Brother",
        Nomineename: "JAY",
        NomineeAddress: "Uttar Pradesh,Lucknow",
        agentId: "00429692",
        GoGreenFlag: "No",
      },
      proposer: {
        Proposer_Name: null,
        Proposer_FirstName: "",
        Proposer_MiddleName: "",
        Proposer_LastName: "",
        Proposer_DateofBirth: "30/06/1999",
        Proposer_Email: "",
        Proposer_Mobile: "",
        Proposer_PanNo: "",
        Proposer_AnnualIncome: null,
        Proposer_OrganisationType: "Others",
        Proposer_PepStatus: "No",
        Proposer_Salutation: "MR",
        Proposer_Gender: "M",
        Proposer_Mailing_Address1: "",
        Proposer_Mailing_Address2: "",
        Proposer_Perm_Address1: "",
        Proposer_Perm_Address2: "",
        Proposer_Mailing_PinCode: "226002",
        Proposer_Mailing_City: "",
        Proposer_Mailing_District: "",
        Proposer_GSTIN_Number: "",
        Proposer_GSTIN_State: "",
        Proposer_Professtion: "",
        Proposer_MaritalStatus: "",
        Proposer_EIA_Number: "",
        Proposer_Nationality: "",
        Proposer_Mobile_CountryCode: 91,
        Proposer_Pehchaan_id: null,
      },
      memberDetailsList: memberDetailsList,
      memberPYPDetailsList: null,
      Loading_Discount: {
        LoyaltyDiscount: false,
        PreviousPolicyNumber: "",
        EmployeeDiscount: false,
        EmployeeCode: "",
        EmployeeEmailID: "",
        OnlineDiscount: false,
      },
    },
  };
};

const reqObj = createQuoteReqObjHDFC(QuotationFrontEnd);
console.log(reqObj);
