// Browser Auth0 Id EK6K - G8XL - BHM8 - MRCY - AN5U - LPAJ
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import "rxjs/add/operator/filter";
import * as auth0 from "auth0-js";

@Injectable()
export class AuthService {
  // requestedScopes: string = "openid profile";
  requestedScopes: string =
    "openid profile read:scorecards read:matches create:match create:member read:members remove:scorecard";

  auth0 = new auth0.WebAuth({
    clientID: "9E3q7XC0qIfGdCgoLehJRhFoKKNstSIo",
    domain: "roch.auth0.com",
    responseType: "token id_token",
    audience: "http://localhost:4200/home",
    redirectUri: "http://localhost:4200/matches",
    scope: this.requestedScopes,
  });
  userProfile: auth0.Auth0UserProfile;

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = "";
        this.setSession(authResult);
        this.router.navigate(["/home"]);
        console.log(
          "AUTHRESULT",
          authResult.accessToken,
          "AuthIDToken",
          authResult.idToken
        );
      } else if (err) {
        this.router.navigate(["/home"]);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const scopes = authResult.scope || this.requestedScopes;
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    const gpcb = {cb: (err1, profile1)=> {
      localStorage.setItem("roles", profile1["https://roch.com/roles"]);
      localStorage.setItem("logonId", profile1.name);
      this.rolesToScopes(localStorage.getItem("roles"));
      console.log('E', err1);
      console.log('P', profile1);
      console.log("Roles", profile1["https://roch.com/roles"]);
      console.log("Roles from LS", localStorage.getItem("roles"));
      console.log("Roles from LS", localStorage.getItem("logonId"));
      console.log("Scopes from LS", localStorage.getItem("scopes")); }
    };
    ;
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    // localStorage.setItem('scopes', scopes);
    console.log("Result", authResult);
    console.log("PermissionsT", authResult.accessToken.permissions);
    console.log("SSSCOPESJSON", JSON.stringify(scopes));
    this.getProfile(gpcb.cb);

  }

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem("scopes")).split(" ");
    // const grantedScopes = localStorage.getItem('scopes');
    console.log("HAS GRANTED SCOPES", grantedScopes);
    // console.log("HAS SCOPES", scopes);
    // console.log("HAS SCOPESJSON", JSON.stringify(scopes));
    return scopes.every((scope) => grantedScopes.includes(scope));
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("roles");
    localStorage.removeItem("logonId");
    localStorage.removeItem("scopes");
    // Go back to the home route
    this.router.navigate(["/"]);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    // console.log('isAuth', expiresAt- new Date().getTime());
    return new Date().getTime() < expiresAt;
  }
  public getProfile(cb): void {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("Access Token must exist to fetch profile");
    }
    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
        console.log('Profile', profile);
      }
      cb(err, profile);
    });
  }
  public rolesToScopes(roles){
    localStorage.removeItem("scopes");
    var scopes: string;
    switch (roles) {
        case 'Admin':
          scopes = `openid profile read:scorecards read:matches read:scores read:members create:match create:member create:score create:scorecard update:scorecard update:match update:score update:member remove:scorecard remove:match remove:score remove:member`;
          localStorage.setItem("scopes", JSON.stringify(scopes));
            break;
        case 'Player':
          scopes = `openid profile read:scorecards read:matches read:scores read:members create:match create:member create:score create:scorecard update:scorecard update:match update:score update:member`;
          localStorage.setItem("scopes", JSON.stringify(scopes));
            break;
        case 'Member':
          scopes = `openid profile read:scorecards read:matches read:scores read:members`;
          localStorage.setItem("scopes", JSON.stringify(scopes));
            break;
        case 'Vistor': console.log('not implemented')
            break;
        default:
            console.log('invalid role');
        }
  }
}
