import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { searchCompanyByText } from "../../redux/CompanySlice";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company,
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="rounded-2xl border bg-white shadow-sm p-4">
      <Table>
        <TableCaption className="text-gray-500">
          A list of your recently registered companies
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                You haven't registered any company yet
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-gray-50 transition"
              >
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        company.logo ||
                        "https://copyrightservice.co.uk/_f/4815/9197/8330/logo-1933884_640.jpg"
                      }
                    />
                  </Avatar>
                </TableCell>

                <TableCell className="font-medium">{company.name}</TableCell>

                <TableCell className="text-gray-600">
                  {company.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="p-2 rounded-md hover:bg-gray-100">
                      <MoreHorizontal className="h-5 w-5 text-gray-600" />
                    </PopoverTrigger>

                    <PopoverContent align="end" className="w-32 p-2">
                      <div
                        onClick={() =>
                          navigate(`/company/get/${company._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer rounded-md p-2 hover:bg-gray-100"
                      >
                        <Edit2 className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
