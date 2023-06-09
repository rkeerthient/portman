import * as React from "react";

import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import { Image } from "@yext/pages/components";
import { AtSymbolIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Schema from "../components/Schema";

export const config: TemplateConfig = {
  stream: {
    $id: "about-your-dentist",
    filter: {
      entityIds: ["location"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "geocodedCoordinate",
      "c_offeredServices.name",
      "c_offeredServices.description",
      "c_offeredServices.slug",
      "c_featuredServices.name",
      "c_featuredServices.description",
      "c_featuredServices.slug",
      "services",
      "timezone",
      "photoGallery",
      "paymentOptions",
      "insuranceAccepted",
      "c_relatedDoctors.name",
      "c_relatedDoctors.headshot",
      "c_relatedDoctors.mainPhone",
      "c_relatedDoctors.address",
      "c_relatedDoctors.description",
      "c_relatedDoctors.degrees",
      "c_relatedDoctors.slug",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return `about-your-dentist`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: `
     About Your Dentist | 
     ${document.name} | 
     ${document._site.c_relatedFacility[0].address.city}`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description: "About your dentist page description!",
        },
      },
    ],
  };
};

const AboutYourDentist: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const cpy = document;

  const { _site, c_relatedDoctors } = document;

  return (
    <>
      <Schema document={cpy}></Schema>
      <PageLayout _site={_site}>
        <div className="mx-auto my-16 text-center text-xl md:text-3xl underline">
          Meet our Dentists
        </div>
        <div className="centered-container">
          <div className="section space-y-10">
            {c_relatedDoctors.map((item: any, index: any) => {
              const {
                address,
                degrees,
                description,
                headshot,
                mainPhone,
                name,
                slug,
              } = item;

              return (
                <>
                  <div
                    className="flex flex-col md:flex-row justify-evenly space-y-4 md:space-x-4"
                    key={index}
                  >
                    <div className="w-full md:!w-1/4">
                      <Image image={headshot}></Image>
                    </div>
                    <div className="w-full md:w-3/4 py-4 flex flex-col justify-between space-y-2">
                      <div>
                        <div className="text-2xl md:text-3xl  ">{name}</div>
                        <hr className="mt-2 " />
                      </div>
                      <div className="flex flex-row space-x-4 ">
                        <div className="gap-2 items-center px-2 py-1 font-medium flex justify-start">
                          <PhoneIcon className="h-3 w-3" />
                          {mainPhone}
                        </div>
                        <div className="gap-2 items-center px-2 py-1 font-medium flex justify-start">
                          <AtSymbolIcon className="h-3 w-3" />
                          {"person@email.com"}
                        </div>
                      </div>
                      <div className="w-full md:w-auto">
                        {description && description.length >= 400
                          ? description.slice(0, 400)
                          : description ||
                            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias repellendus vero eligendi esse qui nam veritatis, corrupti aperiam sequi fuga cupiditate magnam doloribus? Rem mollitia magnam cumque eos in fuga?"}
                      </div>
                      <a href={slug}>
                        <div className="mt-4 md:mt-0 border  py-2 px-4 bg-gray-600 text-white w-fit   hover:bg-white hover:text-gray-600 hover:border-gray-600">
                          Learn more
                        </div>
                      </a>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default AboutYourDentist;
