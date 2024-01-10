import ProposalFormComponent from "./ProposalFormComponent";
import MyProposalsComponent from "./MyProposalsComponent";

const ProposalsComponent = () => {

  return (
    <div className="px-2 proposals flex flex-wrap">
      <ProposalFormComponent/>
      <MyProposalsComponent/>
    </div>
  );
}

export default ProposalsComponent;
