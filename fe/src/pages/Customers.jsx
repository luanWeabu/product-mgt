import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { publicAxios } from "../http/instances";
import API_ENDPOINT from "../constants/api-endpoint";

const tableRow = ["LastName", "FirstName", "Email"];

export default function Customers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function UserDataAPI() {
      try {
        const getDataUser = await publicAxios.get(API_ENDPOINT.USER);
        const respone = getDataUser.data;
        setUsers(respone);
      } catch (error) {
        console.error(error);
      }
    }
    UserDataAPI();
  }, []);

  return (
    <div className=" w-full mt-10">
      <Typography variant="h1">Customer</Typography>
      <div>
        <Card className="h-full w-[65vw] overflow-scroll lg:mt-5">
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                {tableRow.map((item) => (
                  <th
                    key={item}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {item}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const isLast = index === tableRow.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={user.id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.firstname}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.lastname}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.email}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
