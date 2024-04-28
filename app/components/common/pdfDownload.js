import React from 'react';
import html2pdf from 'html2pdf.js';
import PrimaryButton from '../../(site)/components/common/primaryButton';

const GeneratePdf = ({ children }) => {
    const handleDownload = () => {
        const element = document.getElementById('receipt-content');
        element.style.width = '288px';
        element.style.height = 'fit-content';
        element.style.border = '1px solid gray';
        element.style.margin = '20px auto';
        html2pdf()
            .from(element)
            .save('receipt.pdf')
            .then(() => {
                handleCancel()
                element.style.border = 'none';
            });
    };
    return (
        <div id="receipt-content">
            {children}
            <div className='px-4 pb-5'>
                <PrimaryButton onClick={handleDownload} className='text-sm px-4 md:px-[38px] md:py-[11px] font-medium w-full h-fit capitalize'>Download Receipt</PrimaryButton>
            </div>
        </div>
    );
};

export default GeneratePdf;
