package com.shivam.flightreservationapp.services;

import java.io.OutputStream;

import org.springframework.stereotype.Service;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.shivam.flightreservationapp.entities.Booking;
import com.shivam.flightreservationapp.entities.Flight;
import com.shivam.flightreservationapp.entities.User;

@Service
public class TicketPdfGeneratorService {

//    public String generateTicketPdf(User user, Flight flight, Booking booking) throws DocumentException, IOException {
//        String pdfPath = "E:\\Tickets\\Ticket" + booking.getId()+"-"+booking.getBookingDate() + ".pdf";
//        Document document = new Document();
//        PdfWriter.getInstance(document, new FileOutputStream(pdfPath));
//
//        document.open();
//
//        // Add ticket details
//        Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
//        Paragraph title = new Paragraph("Booking Invoice", titleFont);
//        title.setAlignment(Element.ALIGN_CENTER);
//        document.add(title);
//
//        document.add(new Paragraph(""));
//        document.add(new Paragraph("Booking ID: " + booking.getId()));
//        document.add(new Paragraph("Passenger: " + user.getUsername()));
//        document.add(new Paragraph("Flight Number: " + flight.getFlightNumber()));
//        document.add(new Paragraph("Seat Number: "+ booking.getSeatNumber()));
//        document.add(new Paragraph("From: " + flight.getOrigin() ));
//        document.add(new Paragraph("To: " + flight.getDestination()));
//        document.add(new Paragraph("Departure Date: " + flight.getDepartureDate()));
//        document.add(new Paragraph("Departure Time: " + flight.getDepartureTime()));
//        document.add(new Paragraph("Booking Date: " + booking.getBookingDate()));
//
//        document.close();
//
//        return pdfPath; 
//    }
	
	public void generateTicketPdf(User user, Flight flight, Booking booking, OutputStream outputStream) throws DocumentException {
	    Document document = new Document();
	    PdfWriter.getInstance(document, outputStream);

	    document.open();
	    Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
	    Paragraph title = new Paragraph("Booking Invoice", titleFont);
	    title.setAlignment(Element.ALIGN_CENTER);
	    document.add(title);

	    document.add(new Paragraph(""));
	    document.add(new Paragraph("Booking ID: " + booking.getId()));
	    document.add(new Paragraph("Passenger: " + user.getUsername()));
	    document.add(new Paragraph("Flight Number: " + flight.getFlightNumber()));
	    document.add(new Paragraph("Seat Number: " + booking.getSeatNumber()));
	    document.add(new Paragraph("From: " + flight.getOrigin()));
	    document.add(new Paragraph("To: " + flight.getDestination()));
	    document.add(new Paragraph("Departure Date: " + flight.getDepartureDate()));
	    document.add(new Paragraph("Departure Time: " + flight.getDepartureTime()));
	    document.add(new Paragraph("Booking Date: " + booking.getBookingDate()));

	    document.close();
	}
}

