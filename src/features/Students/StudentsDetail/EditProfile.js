import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { StudentsService } from "../../../services/students.service";

/**
 * EditProfileForm component
 * - First name
 * - Middle name
 * - Last name
 * - Email
 * - Gender
 * - DOB
 * - Guardian full name
 * - Guardian phone umber
 * -
 * @returns {JSX.Element}
 */
const EditProfileForm = ({ student }) => {
  const genders = [
    { name: "Male", code: "MALE" },
    { name: "Female", code: "FEMALE" },
  ];

  const guardianRelationships = [
    { name: "Father", value: "Father" },
    { name: "Mother", value: "Mother" },
    { name: "Guardian", value: "Guardian" },
  ];

  const [gender, selectGender] = useState();
  const [guardianRelationship, setGuardianRelationship] = useState(
    student.guardianRelationship,
  );

  const { handleSubmit, control } = useForm({
    defaultValues: {
      firstName: student.firstName || "",
      middleName: student.middleName || "",
      lastName: student.lastName || "",
      email: student.email || "",
      gender: student.gender || "",
      dob: student.dob || "",
      phone: student.phone || "",
      guardianRelationship: student.guardianRelationship || "",
      guardianPhoneNumber: student.guardianPhoneNumber || "",
      guardianName: student.guardianName || "",
      guardianEmail: student.guardianEmail || "",
      guardianWhatsapp: student.guardianWhatsapp || "",
      city: student.city || "",
      country: student.country || "",
      mediaPublicationConsent: student.mediaPublicationConsent || "",
      dataStorageConsent: student.dataStorageConsent || "",
    },
  });

  useEffect(() => {
    if (student) {
      const defaultStudentGender =
        genders.find((g) => g.name === student.gender) || genders[0];

      selectGender(defaultStudentGender);
    }
  }, [student]);

  const onSubmit = async (values) => {
    try {
      console.log(gender);
      await StudentsService.updateStudent(student.id, {
        ...values,
        gender: gender.code,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="mb-2">Student Information</h3>
        <div className="flex flex-row justify-content-between">
          <div>
            <label
              htmlFor="firstName"
              className="block text-900 font-medium mb-20"
            >
              First Name
            </label>
            <Controller
              render={({ field }) => (
                <InputText
                  name="firstName"
                  id="firstName"
                  type="text"
                  className="w-full mb-3"
                  required
                  {...field}
                />
              )}
              name="firstName"
              control={control}
            />
          </div>

          <div>
            <label
              htmlFor="middleName"
              className="block text-900 font-medium mb-20"
            >
              Middle Name (Optional)
            </label>
            <Controller
              render={({ field }) => (
                <InputText
                  name="middleName"
                  id="middleName"
                  type="text"
                  className="w-full mb-3"
                  {...field}
                />
              )}
              name="middleName"
              control={control}
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-900 font-medium mb-20"
            >
              Last Name
            </label>
            <Controller
              render={({ field }) => (
                <InputText
                  name="lastName"
                  id="lastName"
                  type="text"
                  className="w-full mb-3"
                  required
                  {...field}
                />
              )}
              name="lastName"
              control={control}
            />
          </div>
        </div>

        <div className="flex flex-row justify-content-between">
          <div>
            <label
              htmlFor="gender"
              className="block text-900 font-medium mb-20"
            >
              Gender
            </label>
            <Controller
              render={({ field: { onChange } }) => (
                <Dropdown
                  value={gender}
                  onChange={(e) => {
                    selectGender(e.value);
                    onChange(e.value.code);
                  }}
                  options={genders}
                  optionLabel="name"
                  placeholder="Select gender"
                  className="w-full md:w-14rem"
                />
              )}
              name="gender"
              control={control}
            />
          </div>

          <div>
            <label htmlFor="dob" className="block text-900 font-medium mb-20">
              Date of birth
            </label>
            <Controller
              render={({ field }) => (
                <InputText
                  name="dob"
                  id="dob"
                  type="text"
                  className="w-full mb-3"
                  required
                  {...field}
                />
              )}
              name="dob"
              control={control}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-900 font-medium mb-20">
              Phone Number
            </label>
            <Controller
              render={({ field }) => (
                <InputText
                  name="phone"
                  id="phone"
                  type="text"
                  className="w-full mb-3"
                  required
                  {...field}
                />
              )}
              name="phone"
              control={control}
            />
          </div>
        </div>

        <h3 className="mb-2">Guardian Information</h3>
        <div className="flex flex-row justify-content-between">
          <div className="w-5">
            <label
              htmlFor="guardianName"
              className="block text-900 font-medium mb-20"
            >
              Guardian Name
            </label>
            <Controller
              render={({ field }) => (
                <InputText
                  name="guardianName"
                  id="guardianName"
                  type="text"
                  className="w-full mb-3"
                  required
                  {...field}
                />
              )}
              name="guardianName"
              control={control}
            />
          </div>

          <div className="w-6">
            <label
              htmlFor="guardianRelationship"
              className="block text-900 font-medium mb-20"
            >
              Guardian Relationship
            </label>
            <Controller
              render={({ field: { onChange } }) => (
                <Dropdown
                  value={guardianRelationship}
                  onChange={(e) => {
                    setGuardianRelationship(e.value);
                    onChange(e.value.value);
                  }}
                  options={guardianRelationships}
                  optionLabel="name"
                  placeholder="Guardian relationship"
                  className="w-full"
                />
              )}
              name="gender"
              control={control}
            />
          </div>
        </div>

        <div className="flex flex-row justify-content-between">
          <div className="w-5">
            <label
              htmlFor="guardianPhoneNumber"
              className="block text-900 font-medium mb-20"
            >
              Guardian Phone Number
            </label>
            <Controller
              render={({ field }) => (
                <InputText
                  name="guardianPhoneNumber"
                  id="guardianPhoneNumber"
                  type="text"
                  className="w-full mb-3"
                  required
                  {...field}
                />
              )}
              name="guardianPhoneNumber"
              control={control}
            />
          </div>

          <div className="w-6">
            <label htmlFor="dob" className="block text-900 font-medium mb-20">
              Guardian Email
            </label>
            <Controller
              render={({ field }) => (
                <InputText
                  name="guardianEmail"
                  id="guardianEmail"
                  type="text"
                  className="w-full mb-3"
                  required
                  {...field}
                />
              )}
              name="guardianEmail"
              control={control}
            />
          </div>
        </div>

        <br />
        <Button label="Submit" type="submit" className="w-4" />
      </form>
    </>
  );
};

export default EditProfileForm;
