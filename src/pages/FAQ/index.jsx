import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Typography, Card, CardContent, Box, useTheme } from "@mui/material";

const FAQ = () => {
  const theme = useTheme();
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "1010px",
          mx: 2,
          [theme.breakpoints.up("md")]: {
            mx: "auto",
          },
          my: 4,
          py: 1,
          borderRadius: 4,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Frequently Asked Questions (FAQs) for iiraadi.net
        </Typography>
        <Card sx={{ mt: 2 }}>
          <CardContent sx={{ pb: 2, pt: 2 }}>
            <Typography variant="h3" sx={ { fontWeight: "bold", mb: 1}}>What is iiraadi.net?</Typography>
            <Typography variant="body1" sx={ { fontSize: 16 } } >
              iiraadi.net is a classified website where users can buy and sell items or services like vehicles, properties, jobs, and more. It is a marketplace for both individuals and businesses to connect with each other.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ mt: 2 }}>
          <CardContent sx={{ pb: 2, pt: 2 }}>
            <Typography variant="h3" sx={ { fontWeight: "bold", mb: 1}}>How do I create an ad on iiraadi.net?</Typography>
            <Typography variant="body1" sx={ { fontSize: 16 } } >
              To create an ad on iiraadi.net, you need to register for an account first. Once registered, you can log in and create a new ad by clicking on the "Create ad" button and filling in the details of your product or service. You can also add photos, set a price, and choose the category and location of the ad.
            </Typography>
          </CardContent>
        </Card>
        {/* More Cards with Questions and Answers */}
        <Card sx={{ mt: 2 }}>
          <CardContent sx={{ pb: 2, pt: 2 }}>
            <Typography variant="h3" sx={ { fontWeight: "bold", mb: 1}}>How much does it cost to create an ad on iiraadi?</Typography>
            <Typography variant="body1" sx={ { fontSize: 16 } } >
              The cost of creating an ad on iiraadi.net varies depending on the category and duration of the ad. The pricing ranges from free to a few hundred NOK, and it is calculated according to the period length and how many categories you want your ad to appear in.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ mt: 2 }}>
          <CardContent sx={{ pb: 2, pt: 2 }}>
            <Typography variant="h3" sx={ { fontWeight: "bold", mb: 1}}>Can I edit or delete my ad after publishing it?</Typography>
            <Typography variant="body1" sx={ { fontSize: 16 } } >
              Yes, you can edit or delete your ad after publishing it on iiraadi.net. You can access your ads by logging into your account and clicking on "My account," then selecting "My ads." From there, you can select which ad you want to edit or delete.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ mt: 2 }}>
          <CardContent sx={{ pb: 2, pt: 2 }}>
            <Typography variant="h3" sx={ { fontWeight: "bold", mb: 1}}>What payment methods are available on iiraadi.net?</Typography>
            <Typography variant="body1" sx={ { fontSize: 16 } } >
              There are various payment methods available on iiraadi.net, depending on the seller's preference. You can pay via bank transfer, cash on delivery, or some sellers may offer secure online payment solutions like PayPal or Stripe.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ mt: 2 }}>
          <CardContent sx={{ pb: 2, pt: 2 }}>
            <Typography variant="h3" sx={ { fontWeight: "bold", mb: 1}}>Can I get a refund if I am not satisfied with my purchase?</Typography>
            <Typography variant="body1" sx={ { fontSize: 16 } } >
              iiraadi.net is a classified website where buyers and sellers connect with each other, so it is up to the seller to decide their refund policy. You should contact the seller directly and ask if they offer refunds or returns before making a purchase.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ mt: 2 }}>
          <CardContent sx={{ pb: 2, pt: 2 }}>
            <Typography variant="h3" sx={ { fontWeight: "bold", mb: 1}}>How can I contact the seller if I have questions about their product or service?</Typography>
            <Typography variant="body1" sx={ { fontSize: 16 } } >
              You can contact the seller directly through the messaging system on iiraadi.net. Simply click on the "Contact seller" button on their ad and send them a message. They will receive your message in their inbox and can reply to you directly.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ mt: 2 }}>
          <CardContent sx={{ pb: 2, pt: 2 }}>
            <Typography variant="h3" sx={ { fontWeight: "bold", mb: 1}}>What should I do if I have a problem with a seller or their product/service?</Typography>
            <Typography variant="body1" sx={ { fontSize: 16 } } >
              If you have a problem with a seller or their product/service, you should first try to contact them and resolve the issue directly. If that does not work, you can report the ad to iiraadi.net by clicking on the "Report ad" button. iiraadi.net has a team that can investigate fraudulent and inappropriate ads.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ mt: 2 }}>
          <CardContent sx={{ pb: 2, pt: 2 }}>
            <Typography variant="h3" sx={ { fontWeight: "bold", mb: 1}}>How do I search for specific products/services on iiraadi.net?</Typography>
            <Typography variant="body1" sx={ { fontSize: 16 } } >
              To search for specific products/services on iiraadi.net, you can use the search bar located at the top of the page. You can also filter your search results by location, category, or price range by selecting the corresponding menu items.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ mt: 2 }}>
          <CardContent sx={{ pb: 2, pt: 2 }}>
            <Typography variant="h3" sx={ { fontWeight: "bold", mb: 1}}>How can I get customer support from iiraadi.net?</Typography>
            <Typography variant="body1" sx={ { fontSize: 16 } } >
              If you need customer support from iiraadi.net, you can contact them through their customer support page by filling out a form with your query. They will get back to you as soon as possible.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </div>
  );
};

export default FAQ;
