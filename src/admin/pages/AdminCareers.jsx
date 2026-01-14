import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { toast } from "react-toastify";
import {
  addJob,
  deleteJob,
  getAllApplications,
  getAllJobs,
} from "../../services/AllApi";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { Card } from "flowbite-react";
import { authContext } from "../../context/authContext";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { baseURL } from "../../services/baseURL";

const AdminCareers = () => {
  const [showJobs, setShowJobs] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [jobData, setJobData] = useState([]);

  const [applyData, setApplyData] = useState([]);

  const { token } = useContext(authContext);

  useEffect(() => {
    getJobData();
    getApplyData();
  }, []);

  const [jobInputData, setJobInputData] = useState({
    jobId: "",
    jobRole: "",
    jobDesc: "",
    publishedDate: "",
    lastDate: "",
    salary: "",
    experience: "",
  });

  const onAddJobClick = async () => {
    try {
      // let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await addJob(jobInputData, header);
      if (apiResponse.status == 201) {
        toast.success("SuccessFully Added");
        getJobData();
      } else {
        toast.error(apiResponse.response.data.message);
      }
      setOpenModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while adding job");
    }
  };

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

  const onDeleteClick = async (id) => {
    try {
      // let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await deleteJob(id, header);
      if (apiResponse.status == 200) {
        toast.success("Successfully Deleted");
        getJobData();
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting job");
    }
  };

  const getApplyData = async () => {
    try {
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getAllApplications(header);

      if (apiResponse.status == 200) {
        setApplyData(apiResponse.data);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting application data");
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="grid grid-cols-[3fr_9fr]">
        <AdminSidebar />
        <div>
          <h1 className="text-center mt-2">Admin Careers</h1>

          <div className="text-center mt-10">
            <button
              onClick={() => {
                setShowJobs(true);
                setShowApplications(false);
              }}
              className="bg-gray-700 border rounded p-1 text-white cursor-pointer"
            >
              View Jobs
            </button>
            <button
              onClick={() => {
                setShowJobs(false);
                setShowApplications(true);
              }}
              className="bg-gray-800 border rounded p-1 text-white cursor-pointer ms-2"
            >
              View Applications
            </button>
          </div>

          <div>
            {showJobs && (
              <div>
                <h1 className="text-center mt-7 text-2xl font-bold">
                  All Jobs
                </h1>

                <button
                  onClick={() => setOpenModal(true)}
                  className="bg-green-700 ms-2 border rounded-2xl p-2 text-white cursor-pointer"
                >
                  Add New Job
                </button>

                {jobData?.length > 0 ? (
                  <div>
                    {jobData?.map((eachJob) => (
                      <Card className="max-w-full bg-amber-600 mx-30 my-10">
                        <button
                          onClick={() => onDeleteClick(eachJob._id)}
                          className="bg-black text-amber-400 w-25 cursor-pointer"
                        >
                          Delete
                        </button>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          Job Id : {eachJob.jobId} | Job Role :{" "}
                          {eachJob.jobRole} | Salary : {eachJob.salary} |
                          Experience : {eachJob.experience}
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
              </div>
            )}

            {showApplications && (
              <div>
                {applyData?.length > 0 ? (
                  <div className="overflow-x-auto mt-10">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableHeadCell>Job Id</TableHeadCell>
                          <TableHeadCell>Job Title</TableHeadCell>
                          <TableHeadCell>Full Name</TableHeadCell>
                          <TableHeadCell>Email</TableHeadCell>
                          <TableHeadCell>Phone Number</TableHeadCell>
                          <TableHeadCell>Resume</TableHeadCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className="divide-y">
                        {applyData?.map((eachData) => (
                          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                              {eachData.jobId}
                            </TableCell>
                            <TableCell>{eachData.jobTitle}</TableCell>
                            <TableCell>{eachData.fullName}</TableCell>
                            <TableCell>{eachData.email}</TableCell>
                            <TableCell>{eachData.phoneNumber}</TableCell>
                            <TableCell>
                              <a
                                target="_blank"
                                href={`${baseURL}/uploads/${eachData.resume}`}
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                              >
                                Download Resume
                              </a>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <h1>No Applications Recieved</h1>
                )}
              </div>
            )}
          </div>
        </div>
        <Modal
          className="mx-90 p-10"
          show={openModal}
          onClose={() => setOpenModal(false)}
        >
          <ModalHeader className="bg-gray-300">Add New Job</ModalHeader>
          <ModalBody className="bg-gray-500">
            <div className="space-y-6 flex justify-between">
              <div className="">
                <input
                  onChange={(e) =>
                    setJobInputData({ ...jobInputData, jobId: e.target.value })
                  }
                  type="text"
                  placeholder="job ID"
                  className=" bg-white w-75 rounded-3xl mt-10 p-1"
                  name=""
                  id=""
                />
                <input
                  onChange={(e) =>
                    setJobInputData({
                      ...jobInputData,
                      jobRole: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Job Role"
                  className=" bg-white w-75 rounded-3xl mt-10 p-1"
                  name=""
                  id=""
                />
                <input
                  onChange={(e) =>
                    setJobInputData({
                      ...jobInputData,
                      jobDesc: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Job Description"
                  className="bg-white w-75 rounded-3xl mt-10 p-1"
                  name=""
                  id=""
                />
              </div>
              <div className="">
                <input
                  onChange={(e) =>
                    setJobInputData({
                      ...jobInputData,
                      publishedDate: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Published Date"
                  className="bg-white w-75 rounded-3xl mt-10 p-1"
                  name=""
                  id=""
                />
                <input
                  onChange={(e) =>
                    setJobInputData({
                      ...jobInputData,
                      lastDate: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Last Date"
                  className=" bg-white w-75 rounded-3xl mt-10 p-1"
                  name=""
                  id=""
                />
                <input
                  onChange={(e) =>
                    setJobInputData({ ...jobInputData, salary: e.target.value })
                  }
                  type="text"
                  placeholder="Salary"
                  className=" bg-white w-75 rounded-3xl mt-10 p-1"
                  name=""
                  id=""
                />
                <input
                  onChange={(e) =>
                    setJobInputData({
                      ...jobInputData,
                      experience: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Experience Required"
                  className=" bg-white w-75 rounded-3xl mt-10 p-1"
                  name=""
                  id=""
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="bg-gray-400">
            <Button
              className="bg-black me-10 p-2 rounded-xl"
              onClick={() => setOpenModal(false)}
            >
              Close
            </Button>
            <Button
              className="bg-green-700 me-10 p-2 rounded-xl"
              onClick={onAddJobClick}
            >
              Add Job
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default AdminCareers;
