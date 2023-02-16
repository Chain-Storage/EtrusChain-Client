import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";

export default function CardTable({ color }) {
  const [getFiles, setGetFiles] = useState([]);
  const [currentRole, setCurrentRole] = useState([]);
  const [totalStorage, setTotalStorage] = useState([]);
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  useEffect(() => {
    sleep(5000).then(() => {
      const fetchData = async () => {
        console.log(await window.ethereum.selectedAddress);
        const url = `http://127.0.0.1:4000/getFilesFromContract/${window.ethereum.selectedAddress}`;
        const urlTwo = `http://127.0.0.1:4000/getAccountType/${window.ethereum.selectedAddress}`;

        let fileSizes = [];

        await axios.get(url).then((response) => {
          console.log(response.data.data);

          setGetFiles(response.data.data.reverse());
        });

        await axios.get(urlTwo).then((response) => {
          console.log(response.data.data);

          setCurrentRole(response.data.data);
        });

        for (let index = 0; index < getFiles.length; index++) {
          const element = getFiles[index];
          fileSizes.push(Number(element[1]));
        }

        console.log(fileSizes);
        const sum = fileSizes.reduce(
          (total, currentValue) => total + currentValue,
          0
        );
        console.log(sum);

        function convertBytesToGB(bytes) {
          return bytes / 1073741824;
        }

        let gigabytes = convertBytesToGB(sum);
        if (currentRole[1] === "normal") {
          setTotalStorage(5);
        } else if (currentRole[1] === "gold") {
          setTotalStorage(50);
        } else if (currentRole[1] === "preminum") {
          setTotalStorage(500);
        }

        if (gigabytes > 5 && currentRole[1] === "normal") {
          alert("You don't hava enough storage");
        } else if (gigabytes > 50 && currentRole[1] === "gold") {
          alert("You don't hava enough storage");
        } else if (gigabytes > 500 && currentRole[1] === "preminum") {
          alert("You don't hava enough storage");
        }
      };

      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <br />
      <br />

      <p> {currentRole[1]} Account </p>

      <br />
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  File Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Size
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Owner
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Shared Users
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  {/*Completion*/}
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {getFiles.map((data) => (
                <tr>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <i className="fas fa-file h-12 w-12"></i>
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light"
                          ? "text-blueGray-600"
                          : "text-white")
                      }
                    >
                      {data[3]}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {data[1] / 1000000} Mb
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-circle text-orange-500 mr-2"></i>
                    {data[0].slice(0, 10)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex"></div>
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <span className="mr-2">60%</span>
                      <div className="relative w-full">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                          <div
                            style={{ width: "60%" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <TableDropdown fileHash={data[4]} fileName={data[3]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
