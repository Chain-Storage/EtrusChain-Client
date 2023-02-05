import React, { useEffect, useState } from "react";
import axios from "axios";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  const [getFiles, setGetFiles] = useState([]);
  const [currentRole, setCurrentRole] = useState([]);
  const [totalStorage, setTotalStorage] = useState(0);
  const [currentStorage, setCurrentStorage] = useState(0);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  useEffect(() => {
    sleep(10000).then(() => {
      const fetchData = async () => {
        console.log(await window.ethereum.selectedAddress);
        const url = `http://127.0.0.1:4000/getFilesFromContract/${window.ethereum.selectedAddress}`;
        const urlTwo = `http://127.0.0.1:4000/getAccountType/${window.ethereum.selectedAddress}`;

        let fileSizes = [];

        await axios.get(url).then((response) => {
          console.log(response.data.data);

          setGetFiles(response.data.data);
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
        setCurrentStorage(gigabytes);
        console.log(currentRole[1]);
        if (currentRole[1] === "normal") {
          setTotalStorage(5);
        } else if (currentRole[1] === "gold") {
          setTotalStorage(50);
        } else if (currentRole[1] === "preminum") {
          setTotalStorage(500);
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
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Storage"
                  statTitle={currentStorage + "/" + totalStorage}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="NEW USERS"
                  statTitle="2,356"
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PEERS"
                  statTitle="924"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statTitle="49,65%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
