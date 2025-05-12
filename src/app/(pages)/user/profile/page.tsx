// Humble start: Declaring this as a client-side component
"use client";

// Humble imports: Bringing in the necessary tools
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "sonner";

// Interface for profile data, covering all fields
interface ProfileData {
  name: string;
  email: string;
  dob: string;
  phone: string;
  area: string;
  landmark: string;
  address: string;
  examCityPreference1: string;
  examCityPreference2: string;
  previousCdaExperience: string;
  cdaExperienceYears: string;
  cdaExperienceRole: string;
  photo: File | null;
  signature: File | null;
  thumbprint: File | null;
  aadhaarNo: string;
  penaltyClauseAgreement: boolean;
  fever: string;
  cough: string;
  breathlessness: string;
  soreThroat: string;
  otherSymptoms: string;
  otherSymptomsDetails: string;
  closeContact: string;
  covidDeclarationAgreement: boolean;
  accountHolderName: string;
  bankName: string;
  ifsc: string;
  branch: string;
  bankAccountNo: string;
  currentDate: string;
  sonOf: string;
  resident: string;
  [key: string]: any;
}

const Profile = () => {
  // Humble state management: Initializing states
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Humble fetch: Getting user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get("/api/auth/signup", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setProfileData(data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          toast.error("Session is over please login again.");
          router.push("/login");
        } else {
          toast.error(err.response?.data?.message || "Data is not found");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  // Humble render: Loading or error states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="ml-2">Please wait a moment data is loading.</p>
      </div>
    );
  }

  if (!profileData) {
    return toast.error("Profile is not found.");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-200 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Dynamic header with user name */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-blue-900 capitalize tracking-tight">
          {profileData.name ? `${profileData.name}` : "User Profile"}
        </h1>

        {/* Personal Details Card */}
        <Card className="mb-10 shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-blue-50 rounded-t-xl">
            <CardTitle className="text-2xl md:text-3xl font-bold text-blue-800">
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            {[
              { key: "name", label: "Full Name" },
              { key: "email", label: "Email" },
              { key: "dob", label: "Date of Birth" },
              { key: "phone", label: "Phone" },
              { key: "area", label: "Area" },
              { key: "landmark", label: "Landmark" },
              { key: "address", label: "Address" },
              { key: "sonOf", label: "Son/Daughter Of" },
              { key: "resident", label: "Resident Of" },
            ].map((field) => (
              <div
                key={field.key}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2"
              >
                <Label className="text-blue-700 w-full md:w-1/3 font-semibold text-lg">
                  {field.label}
                </Label>
                <div className="w-full md:w-2/3">
                  <span className="text-gray-800 bg-gray-100 px-3 py-1 rounded-md text-base font-medium">
                    {profileData[field.key] || "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Exam Preferences Card */}
        <Card className="mb-10 shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-blue-50 rounded-t-xl">
            <CardTitle className="text-2xl md:text-3xl font-bold text-blue-800">
              Exam Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            {[
              { key: "examCityPreference1", label: "Exam City Preference 1" },
              { key: "examCityPreference2", label: "Exam City Preference 2" },
            ].map((field) => (
              <div
                key={field.key}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2"
              >
                <Label className="text-blue-700 w-full md:w-1/3 font-semibold text-lg">
                  {field.label}
                </Label>
                <div className="w-full md:w-2/3">
                  <span className="text-gray-800 bg-gray-100 px-3 py-1 rounded-md text-base font-medium">
                    {profileData[field.key] || "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Experience Card */}
        <Card className="mb-10 shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-blue-50 rounded-t-xl">
            <CardTitle className="text-2xl md:text-3xl font-bold text-blue-800">
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            {[
              {
                key: "previousCdaExperience",
                label: "Previous CDAC Experience",
              },
              { key: "cdaExperienceYears", label: "Years of Experience" },
              { key: "cdaExperienceRole", label: "Role in CDA" },
            ].map((field) => (
              <div
                key={field.key}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2"
              >
                <Label className="text-blue-700 w-full md:w-1/3 font-semibold text-lg">
                  {field.label}
                </Label>
                <div className="w-full md:w-2/3">
                  <span className="text-gray-800 bg-gray-100 px-3 py-1 rounded-md text-base font-medium">
                    {profileData[field.key] || "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Documents Card */}
        <Card className="mb-10 shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-blue-50 rounded-t-xl">
            <CardTitle className="text-2xl md:text-3xl font-bold text-blue-800">
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            {[
              { key: "photo", label: "Photo" },
              { key: "signature", label: "Signature" },
              { key: "thumbprint", label: "Thumbprint" },
            ].map((field) => (
              <div
                key={field.key}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2"
              >
                <Label className="text-blue-700 w-full md:w-1/3 font-semibold text-lg">
                  {field.label}
                </Label>
                <div className="w-full md:w-2/3">
                  <span
                    className={`text-gray-800 px-3 py-1 rounded-md text-base font-medium ${
                      profileData[field.key] ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {profileData[field.key] ? "Uploaded" : "No file uploaded"}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2">
              <Label className="text-blue-700 w-full md:w-1/3 font-semibold text-lg">
                Aadhaar No.
              </Label>
              <div className="w-full md:w-2/3">
                <span className="text-gray-800 bg-yellow-100 px-3 py-1 rounded-md text-base font-medium">
                  {profileData.aadhaarNo || "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Details Card */}
        <Card className="mb-10 shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-blue-50 rounded-t-xl">
            <CardTitle className="text-2xl md:text-3xl font-bold text-blue-800">
              Bank Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            {[
              { key: "accountHolderName", label: "Account Holder Name" },
              { key: "bankName", label: "Bank Name" },
              { key: "ifsc", label: "IFSC Code" },
              { key: "branch", label: "Branch" },
              { key: "bankAccountNo", label: "Bank Account No." },
            ].map((field) => (
              <div
                key={field.key}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2"
              >
                <Label className="text-blue-700 w-full md:w-1/3 font-semibold text-lg">
                  {field.label}
                </Label>
                <div className="w-full md:w-2/3">
                  <span className="text-gray-800 bg-gray-100 px-3 py-1 rounded-md text-base font-medium">
                    {profileData[field.key] || "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Health Declaration Card */}
        <Card className="mb-10 shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-blue-50 rounded-t-xl">
            <CardTitle className="text-2xl md:text-3xl font-bold text-blue-800">
              Health Declaration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            {[
              { key: "fever", label: "Fever" },
              { key: "cough", label: "Cough" },
              { key: "breathlessness", label: "Breathlessness" },
              { key: "soreThroat", label: "Sore Throat" },
              { key: "otherSymptoms", label: "Other Symptoms" },
              { key: "otherSymptomsDetails", label: "Other Symptoms Details" },
              { key: "closeContact", label: "Close Contact with COVID Case" },
            ].map((field) => (
              <div
                key={field.key}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2"
              >
                <Label className="text-blue-700 w-full md:w-1/3 font-semibold text-lg">
                  {field.label}
                </Label>
                <div className="w-full md:w-2/3">
                  <span className="text-gray-800 bg-gray-100 px-3 py-1 rounded-md text-base font-medium">
                    {profileData[field.key] || "N/A"}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2">
              <Label className="text-blue-700 w-full md:w-1/3 font-semibold text-lg">
                COVID Declaration Agreement
              </Label>
              <div className="w-full md:w-2/3">
                <span
                  className={`text-gray-800 px-3 py-1 rounded-md text-base font-medium ${
                    profileData.covidDeclarationAgreement
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {profileData.covidDeclarationAgreement ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agreements Card */}
        <Card className="mb-10 shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-blue-50 rounded-t-xl">
            <CardTitle className="text-2xl md:text-3xl font-bold text-blue-800">
              Agreements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2">
              <Label className="text-blue-700 w-full md:w-1/3 font-semibold text-lg">
                Penalty Clause Agreement
              </Label>
              <div className="w-full md:w-2/3">
                <span
                  className={`text-gray-800 px-3 py-1 rounded-md text-base font-medium ${
                    profileData.penaltyClauseAgreement
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {profileData.penaltyClauseAgreement ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Humble export: Making the component available
export default Profile;
