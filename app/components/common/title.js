"user client"
import { Card } from "antd";

const PageTitle = ({ title }) => {
  return (
    // <div className="flex items-center justify-between mb-4">
    <Card className="mb-4 shadow-sm">
      <h1 className="text-xl text-gray-700 font-semibold">{title}</h1>
    </Card>
    // </div>
  );
};

export default PageTitle;
