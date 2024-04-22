import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function get(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = (await response.json()) as unknown;
  return data;
}

export async function getSession(url: string, credentials: RequestCredentials) {
  const response = await fetch(url, {
    credentials: credentials,
  });

  if (!response.ok) {
    throw new Error("Failed to get session data");
  }
  const data = (await response.json()) as unknown;
  return data;
}

export async function login(
  url: string,
  cookies: Cookies,
  username: string,
  password: string
) {
  const csrftoken: string = cookies.get("csrftoken");
  console.log(csrftoken);
  const response = await axios.post(
    url,
    {
      username: username,
      password: password,
    },
    {
      withCredentials: true,
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.data) {
    throw new Error("Invalid credentials!");
  }

  localStorage.setItem("token", response.data.token);
  localStorage.setItem("role", "client");
  return response.data;
}

export async function loginAdmin(
  url: string,
  cookies: Cookies,
  sessionid: string | null,
  username: string,
  password: string
) {
  const csrftoken: string = cookies.get("csrftoken");
  console.log(csrftoken);
  const response = await axios.post(
    url,
    {
      username: username,
      password: password,
      sessionid: sessionid,
    },
    {
      withCredentials: true,
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.data) {
    throw new Error("Invalid credentials!");
  }

  localStorage.setItem("token", response.data.token);
  localStorage.setItem("role", "admin");
  return response.data;
}

export async function register(
  url: string,
  cookies: Cookies,
  username: string,
  password: string,
  email: string,
  phone: string
) {
  const csrftoken: string = cookies.get("csrftoken");
  console.log(csrftoken);
  const response = await axios.post(
    url,
    {
      username: username,
      password: password,
      email: email,
      phone: phone,
    },
    {
      withCredentials: true,
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.data) {
    throw new Error("Invalid data!");
  }

  localStorage.setItem("token", response.data.token);
  localStorage.setItem("role", "client");
  return response.data;
}

export async function logout(url: string) {
  const response = await axios.get(url, { withCredentials: true });

  if (!response.data) {
    throw new Error("You are not logged in!");
  }

  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  return response.data;
}

export async function book(
  destination: number,
  client: string | null,
  selectedInDate: Date | undefined,
  selectedOutDate: Date | undefined,
  totalCost: number
) {
  if (selectedInDate && selectedOutDate) {
    const startDate = new Date(selectedInDate);
    const endDate = new Date(selectedOutDate);

    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 1);

    // Format the date as 'YYYY-MM-DD'
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    const formattedEndDate = endDate.toISOString().slice(0, 10);
    const url = "http://localhost:8000/api/reservations/";
    const body = {
      destination: destination,
      client: client,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      totalCost: totalCost,
    };
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.data) {
      throw new Error("Invalid data!");
    }

    if (response.status === 201) {
      toast.success("Reservation successfully made!");
    }

    return response.data;
  }
}
