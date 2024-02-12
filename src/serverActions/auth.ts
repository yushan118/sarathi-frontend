"use server";

import { IAdminUser, IAmbulanceUser, IUser } from "@/interfaces/auth";
import { cookies } from "next/headers";

export async function getAuthenticatedUser(): Promise<IUser | undefined> {
  const cookieStore = cookies();

  const authToken = cookieStore.get("AUTH_TOKEN");
  if (!authToken) {
    return undefined;
  }

  try {
    const getCurrentUserRes = await fetch(
      process.env.API_URL! + "/user/current",
      {
        headers: {
          Authorization: authToken.value,
        },
      },
    );
    if (!getCurrentUserRes.ok) {
      return undefined;
    }

    const currentUser = await getCurrentUserRes.json();
    return {
      id: currentUser._id,
      name: currentUser.name,
      mobileNumber: currentUser.mobile_number,
      isSuspended: currentUser.is_suspended,
    };
  } catch (error) {
    return undefined;
  }
}

export async function login(mobile_number: string, password: string) {
  try {
    const loginRes = await fetch(process.env.API_URL! + "/auth/login", {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile_number,
        password,
      }),
    });
    const loginResJson = await loginRes.json();
    if (!loginRes.ok) {
      return { success: false, message: loginResJson.message };
    }

    const cookieStore = cookies();
    cookieStore.set("AUTH_TOKEN", loginResJson.access_token, {
      httpOnly: true,
    });

    return { success: true, message: `Logged in as ${loginResJson.user.name}` };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}

export async function loginAdmin(email: string, password: string) {
  try {
    const loginRes = await fetch(process.env.API_URL! + "/auth/admin/login", {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const loginResJson = await loginRes.json();
    if (!loginRes.ok) {
      return { success: false, message: loginResJson.message };
    }

    const cookieStore = cookies();
    cookieStore.set("AUTH_ADMIN_TOKEN", loginResJson.access_token, {
      httpOnly: true,
    });

    return { success: true, message: `Logged in as ${loginResJson.user.name}` };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}

export async function loginAmbulance(mobile_number: string, password: string) {
  try {
    const loginRes = await fetch(process.env.API_URL! + "/auth/ambulance/login", {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile_number,
        password,
      }),
    });
    const loginResJson = await loginRes.json();
    if (!loginRes.ok) {
      return { success: false, message: loginResJson.message };
    }

    const cookieStore = cookies();
    cookieStore.set("AUTH_AMBULANCE_TOKEN", loginResJson.access_token, {
      httpOnly: true,
    });

    return { success: true, message: `Logged in as ${loginResJson.user.name}` };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete("AUTH_TOKEN");
  cookieStore.delete("AUTH_ADMIN_TOKEN");
  cookieStore.delete("AUTH_AMBULANCE_TOKEN");
}

export async function getAuthenticatedAdminUser(): Promise<
  IAdminUser | undefined
> {
  const cookieStore = cookies();

  const authToken = cookieStore.get("AUTH_ADMIN_TOKEN");
  if (!authToken) {
    return undefined;
  }

  try {
    const getCurrentAdminUserRes = await fetch(
      process.env.API_URL! + "/admin/current",
      {
        headers: {
          Authorization: authToken.value,
        },
      },
    );
    if (!getCurrentAdminUserRes.ok) {
      return undefined;
    }

    const currentAdminUser = await getCurrentAdminUserRes.json();
    return {
      id: currentAdminUser._id,
      name: currentAdminUser.name,
      email: currentAdminUser.email,
    };
  } catch (error) {
    return undefined;
  }
}

export async function getAuthenticatedAmbulanceUser(): Promise<
  IAmbulanceUser | undefined
> {
  const cookieStore = cookies();

  const authToken = cookieStore.get("AUTH_AMBULANCE_TOKEN");
  if (!authToken) {
    return undefined;
  }

  try {
    const getCurrentAmbulanceUserRes = await fetch(
      process.env.API_URL! + "/ambulance/current",
      {
        headers: {
          Authorization: authToken.value,
        },
      },
    );
    if (!getCurrentAmbulanceUserRes.ok) {
      return undefined;
    }

    const currentAmbulanceUser = await getCurrentAmbulanceUserRes.json();
    return {
      id: currentAmbulanceUser._id,
      name: currentAmbulanceUser.name,
      mobileNumber: currentAmbulanceUser.mobile_number,
    };
  } catch (error) {
    return undefined;
  }
}
