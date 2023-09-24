import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Box, Paper, Typography } from '@mui/material';

export default function FAQs() {
    return (
        <Box sx={{ p: 2, width: '100%', boxSizing: 'border-box' }}>
            <Paper elevation={3} sx={{ my: 2, mx: 'auto', p: 2, width: '100%', boxSizing: 'border-box', overflowX: 'auto' }}>
                <Typography variant='h5' sx={{ fontWeight: 700, color: 'secondary.main', textAlign: 'center', mb: 2 }}>Frequently Asked Questions (FAQs)</Typography>
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    <TreeItem nodeId="1" label="How do I place an order?">
                        <TreeItem nodeId="2" label="To place an order, simply browse our products, click on the ones you want, and add them to your cart. Then, proceed to checkout, fill in your shipping and payment details, and confirm your order." />
                    </TreeItem>
                    <TreeItem nodeId="3" label="What payment methods do you accept?">
                        <TreeItem nodeId="4" label="We accept major credit cards, debit cards, PayPal, and Apple Pay for your convenience." />
                    </TreeItem>
                    <TreeItem nodeId="5" label="What is your return policy?">
                        <TreeItem nodeId="6" label="Our return policy allows you to return items within 30 days of purchase, as long as they are unused and in their original packaging. Please visit our Returns page for more details." />
                    </TreeItem>
                    <TreeItem nodeId="7" label="How can I track my order?">
                        <TreeItem nodeId="8" label="After your order is shipped, you will receive an email with a tracking number and a link to our tracking page. You can use this information to monitor your order's progress." />
                    </TreeItem>
                    <TreeItem nodeId="9" label="What is the shipping cost and delivery time?">
                        <TreeItem nodeId="10" label="Shipping costs vary depending on your location and the weight of your order. Standard delivery usually takes 3-5 business days, but expedited shipping options are available." />
                    </TreeItem>
                    <TreeItem nodeId="11" label="Do you offer international shipping?">
                        <TreeItem nodeId="12" label="Yes, we offer international shipping to most countries. Shipping rates and delivery times will be provided during the checkout process." />
                    </TreeItem>
                    <TreeItem nodeId="13" label="What if my product is damaged or defective?">
                        <TreeItem nodeId="14" label="If your product arrives damaged or defective, please contact our customer support team within 7 days of receiving the item. We will guide you through the return and replacement process." />
                    </TreeItem>
                    <TreeItem nodeId="15" label="Can I change or cancel my order?">
                        <TreeItem nodeId="16" label="You can change or cancel your order within 24 hours of placing it. After that, please contact our customer support team for assistance." />
                    </TreeItem>
                    <TreeItem nodeId="17" label="Is my personal information secure?">
                        <TreeItem nodeId="18" label="Rest assured, we take your privacy seriously. Our website uses SSL encryption to protect your personal and financial information." />
                    </TreeItem>
                    <TreeItem nodeId="19" label="How do I contact customer support?">
                        <TreeItem nodeId="20" label="You can reach our customer support team by emailing support@example.com or calling our toll-free number at 1-800-123-4567 during our business hours from 9 AM to 6 PM (UTC)." />
                    </TreeItem>
                    <TreeItem nodeId="21" label="What if I forget my password?">
                        <TreeItem nodeId="22" label="If you forget your password, you can easily reset it by clicking the Forgot Password link on the login page. Follow the instructions sent to your email." />
                    </TreeItem>
                    <TreeItem nodeId="23" label="Do you have a loyalty or rewards program?">
                        <TreeItem nodeId="24" label="Yes, we have a loyalty program! Earn points with every purchase and redeem them for discounts on future orders. Learn more on our Loyalty Program page." />
                    </TreeItem>
                    <TreeItem nodeId="25" label="What is your privacy policy?">
                        <TreeItem nodeId="26" label="Our privacy policy explains how we collect, use, and protect your data. You can review it by visiting our Privacy Policy page." />
                    </TreeItem>
                    <TreeItem nodeId="27" label="How do I subscribe to newsletters or updates?">
                        <TreeItem nodeId="28" label="You can subscribe to our newsletters and updates during the checkout process or by entering your email in the subscription box at the bottom of our website." />
                    </TreeItem>
                    <TreeItem nodeId="29" label="Are the products in stock?">
                        <TreeItem nodeId="30" label="All products listed on our website are currently in stock and ready to be shipped to you." />
                    </TreeItem>
                    <TreeItem nodeId="31" label="What size should I order?">
                        <TreeItem nodeId="32" label="To find your perfect size, refer to our size charts available on product pages. If you need further assistance, please contact our customer support team." />
                    </TreeItem>
                    <TreeItem nodeId="33" label="How can I leave a review or feedback?">
                        <TreeItem nodeId="34" label="You can leave a review by visiting the product page and clicking on the Write a Review button. We value your feedback and appreciate your reviews!" />
                    </TreeItem>
                    <TreeItem nodeId="35" label="What is your company's mission or values?">
                        <TreeItem nodeId="36" label="Our mission is to provide high-quality products and exceptional customer service. We value transparency, integrity, and customer satisfaction above all else." />
                    </TreeItem>
                    <TreeItem nodeId="37" label="Do you offer gift cards or gift wrapping services?">
                        <TreeItem nodeId="38" label="Yes, we offer gift cards for purchase, and we can also provide gift wrapping services. Simply select the gift wrapping option during checkout." />
                    </TreeItem>
                    <TreeItem nodeId="39" label="What browsers and devices are compatible with your website?">
                        <TreeItem nodeId="40" label="Our website is compatible with most modern web browsers and devices, including Chrome, Firefox, Safari, and mobile devices. Please ensure your browser is up to date for the best experience." />
                    </TreeItem>
                </TreeView>
            </Paper>
        </Box>
    );
}