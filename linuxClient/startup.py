import requests
from tkinter import *
from base64 import b64decode
from plyer import notification
import os
import json
import subprocess

def send_notification(title, message, urgency="normal", icon=None):
    """
    Send a desktop notification
    
    Args:
        title: Notification title
        message: Notification body text
        urgency: "low", "normal", or "critical"
        icon: Icon name or path (optional)
    """
    cmd = ["notify-send"]
    
    # Add urgency level
    cmd.extend(["-u", urgency])
    
    # Add icon if provided
    if icon:
        cmd.extend(["-i", icon])
    
    # Add title and message
    cmd.extend([title, message])
    
    try:
        subprocess.run(cmd, check=True)
        print("Notification sent successfully")
    except subprocess.CalledProcessError as e:
        print(f"Failed to send notification: {e}")
    except FileNotFoundError:
        print("notify-send not found. Install with: sudo apt install libnotify-bin")

# Function for Getting Team ID and starting the competition
def start(ip: str):
    nameUrl = f"http://{ip}/api/compname"
    nameResponse = requests.request("GET", nameUrl)
    nameJson = json.loads(nameResponse.text)
    name = nameJson["name"]

    idWindow = Tk()
    idWindow.title(name)
    idWindow.geometry('350x200')

    thanks = Label(idWindow, text="Thanks. Your Connected to " + name)
    thanks.grid(column=0, row=0)

    idLabel = Label(idWindow, text="Please enter your team ID ")
    idLabel.grid(column=0, row=1)
    idEntry = Entry(idWindow, width=7)
    idEntry.grid(column=1, row=1)
    idErrorLbl = Label(idWindow, text="", fg="red")
    idErrorLbl.grid(column=0, row=3)

    def idSubmitClick():
        try:
            teamId = int(idEntry.get())
            idUrl = f"http://{ip}/api/findteambyid"
            idRequestPayload = { "id": teamId }
            idHeaders = { "Content-Type": "application/json" }

            idRequest = requests.request("POST", idUrl, json=idRequestPayload, headers=idHeaders)
            team = idRequest.json()

            teamName = team['teamname']
            settings = { "ip": ip, "id": teamId, "teamname": teamName, "compname": name, "running": True }
            settingsFile = open("govset.score", 'x')
            settingsFile.write(json.dumps(settings))

            data = open("./glowdata.score", 'x')

            data.write(json.dumps(team))

            url = f"http://{ip}/api/linux"

            boo = open("./boo.score", 'x')
            response = requests.request("GET", url)

            boo.write(response.text)
            settingsFile.close()
            data.close()
            boo.close()

            idWindow.destroy()
            send_notification(name, f"Successfully Connected to {teamName}")
        except ValueError as ve:
            idErrorLbl.configure(text="ID PROVIDED IS NOT A NUMBER.")
        except KeyError as ke:
            idErrorLbl.configure(text="ID PROVIDED IS NOT VALID")

    idSubmit = Button(idWindow, text="Submit", command=idSubmitClick)
    idSubmit.grid(column=0, row=2)

    idWindow.mainloop()

# Grab Scoring Server IP Address
ipWindow = Tk()

ipWindow.title("Welcome to the Competition")
ipWindow.geometry('350x200')

titler = Label(ipWindow, text="Welcome to your Competition.")
titler.grid(column=0, row=0)
ipLbl = Label(ipWindow, text="Please enter the IP of the Scoring Server: ")
ipLbl.grid(column=0, row=1)
ipEntry = Entry(ipWindow, width=15)
ipEntry.grid(column=1, row=1)
ipErrorLbl = Label(ipWindow, text="", fg="red")
ipErrorLbl.grid(column=0, row=4)

def ipSubmit():
    try:
        ip = ipEntry.get()

        ipUrl = f"http://{ip}/api/ping"
        ipResponse = requests.request("GET", ipUrl)
        ipJson = json.loads(ipResponse.text)

        if ipJson["status"] == 200:
            ipWindow.destroy()
            start(ip)
        else:
            ipErrorLbl.configure(text="ERROR: IP IS NOT VALID!!!")
    except Exception as e:
        ipErrorLbl.configure(text="ERROR: IP IS NOT VALID")
        print(e)

ipSubmitBtn = Button(ipWindow, text="Submit", command=ipSubmit)
ipSubmitBtn.grid(column=0, row=3)

ipWindow.mainloop()