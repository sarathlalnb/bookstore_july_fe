import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import { toast } from "react-toastify";
import { applyJob, getAllJobs } from "../services/AllApi";
import { Card } from "flowbite-react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

const Careers = () => {
  const [jobData, setJobData] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [applyData, setApplyData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    jobId: "",
    jobTitle: "",
    resume: "",
  });

  useEffect(() => {
    getJobData();
  }, []);

  const getJobData = async () => {
    try {
      let apiResponse = await getAllJobs();
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        setJobData(apiResponse.data);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting job datas");
    }
  };

  const onApplyClick = async () => {
    try {
      let headers = {
        "Content-Type": "multipart/form-data",
      };

      let reqBody = new FormData();

      for (let key in applyData) {
        reqBody.append(key, applyData[key]);
      }

      let apiResponse = await applyJob(reqBody, headers);

      if (apiResponse.status == 201) {
        toast.success("Applied");
      } else {
        toast.error(apiResponse.respose.data.message);
      }x
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while applying job");
    }
  };

  return (
    <>
      <Header />

      {jobData?.length > 0 ? (
        <div>
          {jobData?.map((eachJob) => (
            <Card className="max-w-full bg-amber-600 mx-30 my-10">
              <button
                onClick={() => {
                  setApplyData({
                    ...applyData,
                    jobId: eachJob.jobId,
                    jobTitle: eachJob.jobRole,
                  });
                  setOpenModal(true);
                }}
                className="bg-black text-amber-400 w-25 cursor-pointer"
              >
                Apply Now
              </button>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Job Id : {eachJob.jobId} | Job Role : {eachJob.jobRole} | Salary
                : {eachJob.salary} | Experience : {eachJob.experience}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-900">
                {eachJob.jobDesc}
              </p>
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Published date : {eachJob.publishedDate} | Last Date :{" "}
                {eachJob.lastDate}
              </h5>
            </Card>
          ))}
        </div>
      ) : (
        <h1>No Jobs Added</h1>
      )}

      <Modal
        className="mx-65"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader className="bg-gray-500">Apply Job</ModalHeader>
        <ModalBody className="bg-gray-700">
          <div className="space-y-6 flex mx-20 items-center gap-10">
            <div className="flex flex-col gap-3">
              <input
                onChange={(e) =>
                  setApplyData({ ...applyData, fullName: e.target.value })
                }
                value={applyData.fullName}
                type="text"
                placeholder="fullName"
                className="bg-white p-2 rounded-2xl w-75"
              />
              <input
                onChange={(e) =>
                  setApplyData({ ...applyData, phoneNumber: e.target.value })
                }
                value={applyData.phoneNumber}
                type="number"
                placeholder="Phone Number"
                className="bg-white p-2 rounded-2xl w-75"
              />
              <input
                onChange={(e) =>
                  setApplyData({ ...applyData, email: e.target.value })
                }
                value={applyData.email}
                type="email"
                placeholder="Email"
                className="bg-white p-2 rounded-2xl w-75"
              />
            </div>
            <div>
              <label className="text-white" htmlFor="resume">
                Resume :-
              </label>
              <input
                onChange={(e) =>
                  setApplyData({ ...applyData, resume: e.target.files[0] })
                }
                className="text-white"
                type="file"
                name="resume"
                id="resume"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="bg-gray-800">
          <Button
            className="bg-orange-500 rounded-xl p-2 text-black ms-10"
            onClick={() => setOpenModal(false)}
          >
            Close
          </Button>
          <Button
            className="bg-green-500 rounded-xl p-2 text-black ms-10"
            onClick={onApplyClick}
          >
            Apply
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Careers;
