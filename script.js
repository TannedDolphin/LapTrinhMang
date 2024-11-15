const callBtn = document.getElementById('callBtn')
const loginBtn = document.getElementById('loginBtn')
const answerBtn = document.getElementById('answerBtn')
const rejectBtn = document.getElementById('rejectBtn')
const muteBtn = document.getElementById('muteBtn')
const accessToken = document.getElementById('accessToken')
const callStatus = document.getElementById('callStatus')
const remoteAudio = document.getElementById('remoteAudio')
const userId = document.getElementById('loggedUserId')
const hangupBtn = document.getElementById('hangupBtn')

var client = new StringeeClient();

let call

client.on('connect', function(){
  console.log('connected')
})

client.on('authen', function(res){
  console.log('authen',res)
  if(res.r === 0 ){
    userId.textContent = res.userId
  }
})

loginBtn.addEventListener('click', function() {
  const token = accessToken.value;
  if (token) {
    client.connect(token);
  } else {
    console.log("Please enter an access token.");
  }
});

callBtn.addEventListener('click', function(){
  const from = document.getElementById('loggedUserId').textContent;
  const to = document.getElementById('callTo').value
  call = new StringeeCall(client, from, to, false);
  settingCallEvent(call)
  call.makeCall(function(res){
     console.log('make call back: '+JSON.stringify(res));
  })
 
})

hangupBtn.addEventListener('click', function() {
  if (call) {
    call.hangup(function(res) {
      console.log('hangup res', res);
    });
  } else {
    console.log("No active call to hang up");
  }
});

client.on('incomingcall', function (incomingcall) {
    console.log('incomingcall', incomingcall);
    call = incomingcall;
    settingCallEvent(incomingcall);
    var answer = confirm('Incoming call from: ' + incomingcall.fromNumber + ', do you want to answer?');
    if (answer) {
        call.answer(function (res) {
            console.log('answer res', res);
        });
    } else {
        call.reject(function (res) {
            console.log('reject res', res);
        });
    }
});

muteBtn.addEventListener('click', function() {
  if (call) {
    const isMuted = call.muted;
    call.mute(!isMuted, function(success) {
      if (success) {
        if (!isMuted) {
          muteBtn.textContent = "Unmute";
          muteBtn.classList.add("muted"); // Add the 'muted' class
        } else {
          muteBtn.textContent = "Mute";
          muteBtn.classList.remove("muted"); // Remove the 'muted' class
        }
      } else {
        console.log("Failed to toggle mute.");
      }
    });
  } else {
    console.log("No active call to mute");
  }
});


function settingCallEvent(call1) {
    call1.on('addremotestream', function (stream) {
        // reset srcObject to work around minor bugs in Chrome and Edge.
        console.log('addremotestream');
        remoteAudio.srcObject = null;
        remoteAudio.srcObject = stream;
    });

    call1.on('addlocalstream', function (stream) {
        // reset srcObject to work around minor bugs in Chrome and Edge.
        console.log('addlocalstream');
    });

    call1.on('signalingstate', function (state) {
        console.log('signalingstate ', state);
        var reason = state.reason;
        callStatus.textContent =reason;
    });

    call1.on('mediastate', function (state) {
        console.log('mediastate ', state);
    });

    call1.on('info', function (info) {
        console.log('on info:' + JSON.stringify(info));
    });
}