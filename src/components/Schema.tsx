import * as React from "react";
import { JsonLd } from "react-schemaorg";
import { Dentist, Place } from "schema-dts";

const Schema = (props: any) => {
  const { document } = props;
  const name = `${document.name}`;
  const address = document.address;
  const telephone = document.mainPhone;
  const description = document.decription;
  const hours = document.hours;
  const paymentOptions = document.paymentOptions;
  const photoGallery = document.photoGallery;

  const itemListElement: any = [];
  if (document.c_offeredServices) {
    document.c_offeredServices.forEach((item: any) => {
      itemListElement.push({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${item.name}`,
        },
      });
    });
    if (document.c_featuredServices) {
      document.c_featuredServices.forEach((item: any) => {
        itemListElement.push({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `${item.name}`,
          },
        });
      });
    }
  }

  return (
    <>
      <JsonLd<Dentist>
        item={{
          "@context": "https://schema.org",
          "@type": "Dentist",
          name,
          description,
          openingHours: hours ? buildHoursSchema(hours) : "Mo-Sa 9:00-12:00",
          telephone,
          email: "example@example.com",
          address: {
            "@type": "PostalAddress",
            addressRegion: address.region,
            postalCode: address.postalCode,
            streetAddress: address.line1,
            addressLocality: address.city,
          },
          paymentAccepted: paymentOptions ? paymentOptions.toString() : "",
          priceRange: "$$",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: 4.5,
            reviewCount: 22,
          },
          image: photoGallery && photoGallery[0].image.url,
          review: [
            {
              "@type": "Review",
              author: "Liam",
              datePublished: "2020-06-26",
              description: "Great prices, excellent service",
              name: "Great dental clinic",
              reviewRating: {
                "@type": "Rating",
                ratingValue: 5,
              },
            },
            {
              "@type": "Review",
              author: "David",
              datePublished: "2020-05-16",
              description:
                "I am totally satisfied with the quality of service, but the waiting time should be reduced",
              name: "Waiting time",
              reviewRating: {
                "@type": "Rating",
                ratingValue: 4,
              },
            },
          ],
        }}
      />
      {/* <JsonLd<ItemList>
        item={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: productsList,
        }}
      /> */}
      {/*  <JsonLd<FAQPage>
        item={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqsList,
        }}
      /> */}

      {document.geocodedCoordinate && (
        <JsonLd<Place>
          item={{
            "@context": "https://schema.org",
            "@type": "Place",
            geo: {
              "@type": "GeoCoordinates",
              latitude: document.geocodedCoordinate.latitude,
              longitude: document.geocodedCoordinate.longitude,
            },
          }}
        />
      )}
    </>
  );
};

const buildHoursSchema = (hoursData: any) => {
  const nHrs: any = [];
  Object.keys(hoursData).forEach((item) =>
    nHrs.push(
      hoursData[item].openIntervals &&
        `${item.substring(0, 2).replace(/./, (c) => c.toUpperCase())} ${
          hoursData[item].openIntervals[0].start
        }-${hoursData[item].openIntervals[0].end}`
    )
  );
  return nHrs;
};

export default Schema;
