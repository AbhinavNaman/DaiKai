import React, { useRef, useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import styled from "styled-components";

Chart.register(...registerables);

// Styled components for UI enhancement
const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #f7f9fc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #4a90e2;
  font-family: "Arial", sans-serif;
`;

const Button = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #4a90e2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357ab8;
  }
`;

const EventContainer = styled.div`
  margin-bottom: 40px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

const EventTitle = styled.h2`
  color: #333;
  margin-bottom: 10px;
`;

const EventDetail = styled.p`
  margin: 5px 0;
  color: #555;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 20px;
`;

const ClubReport = ({ events }) => {
  const chartRefs = useRef([]);
  const [isChartsRendered, setIsChartsRendered] = useState(false);

  const generatePDF = async () => {
    // if (!events || events.length === 0) return;
    
    const hostClubName = events[0]?.hostName;
    const doc = new jsPDF();

    // Add background color to title
    doc.setFillColor("#4a90e2");
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");

    // Add the title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#ffffff");
    const title = `${hostClubName} Events Report`;
    const titleWidth = doc.getTextWidth(title);
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleX = (pageWidth - titleWidth) / 2;
    doc.text(title, titleX, 20);

    for (let i = 0; i < events.length; i++) {
      const event = events[i];

      // Add new page for each event, skip adding a new page for the first event
      if (i > 0) {
        doc.addPage();
      }

      // Event details
      let yOffset = 40;
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor("#333333");
      doc.text(`Event Name: ${event.name}`, 20, yOffset);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor("#555555");
      doc.text(`Description: ${event.description}`, 20, yOffset + 10);
      doc.text(`Location: ${event.location}`, 20, yOffset + 20);
      doc.text(`Tags: ${event.tags.join(", ")}`, 20, yOffset + 30);
      doc.text(
        `Registrations: ${event.registrations.length}`,
        20,
        yOffset + 40
      );
      doc.text(`Participants: ${event.participants.length}`, 20, yOffset + 50);

      yOffset += 70;

      // Add the chart as an image to the PDF
      const chartCanvas = chartRefs.current[i]?.canvas;
      if (chartCanvas) {
        const imgData = chartCanvas.toDataURL("image/png", 1.0);
        doc.addImage(imgData, "PNG", 20, yOffset, 170, 80);
      }
    }

    // Save the PDF
    doc.save("club-report.pdf");
  };

  // Function to get chart data for Bar chart
  const getChartData = (participants) => {
    const collegeCounts = {};
    participants?.forEach((participant) => {
      if (collegeCounts[participant.collegeName]) {
        collegeCounts[participant.collegeName]++;
      } else {
        collegeCounts[participant.collegeName] = 1;
      }
    });

    return {
      labels: Object.keys(collegeCounts),
      datasets: [
        {
          label: "Participants per College",
          data: Object.values(collegeCounts),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    // Initialize refs array
    chartRefs.current = chartRefs.current.slice(0, events.length);
    setIsChartsRendered(true); // Set flag indicating charts should be rendered
  }, [events.length]);

  if (!events || events.length === 0) {
    return <Container>No events to display</Container>;
  }

  return (
    <Container>
      <Title>{events[0]?.hostName} Events Report</Title>
      <Button onClick={generatePDF}>Download Report</Button>

      {isChartsRendered &&
        events?.map((event, index) => (
          <EventContainer key={index}>
            <EventTitle>{event?.name}</EventTitle>
            <EventDetail>Description: {event?.description}</EventDetail>
            <EventDetail>Location: {event.location}</EventDetail>
            <EventDetail>Tags: {event?.tags.join(", ")}</EventDetail>
            <EventDetail>
              Registrations: {event?.registrations?.length}
            </EventDetail>
            <EventDetail>Participants: {event?.participants?.length}</EventDetail>
            <ChartContainer>
              <Bar
                ref={(el) => {
                  if (el) {
                    chartRefs.current[index] = el;
                  }
                }}
                data={getChartData(event.participants)}
                options={chartOptions}
              />
            </ChartContainer>
          </EventContainer>
        ))}
    </Container>
  );
};

export default ClubReport;
