/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _PartnerCard_artwork$ref: unique symbol;
export type PartnerCard_artwork$ref = typeof _PartnerCard_artwork$ref;
export type PartnerCard_artwork = {
    readonly sale: {
        readonly isBenefit: boolean | null;
        readonly isGalleryAuction: boolean | null;
    } | null;
    readonly partner: {
        readonly is_default_profile_public: boolean | null;
        readonly type: string | null;
        readonly name: string | null;
        readonly gravityID: string;
        readonly internalID: string;
        readonly id: string;
        readonly href: string | null;
        readonly initials: string | null;
        readonly profile: {
            readonly internalID: string;
            readonly gravityID: string;
            readonly is_followed: boolean | null;
            readonly icon: {
                readonly url: string | null;
            } | null;
        } | null;
        readonly locations: ReadonlyArray<{
            readonly city: string | null;
        } | null> | null;
    } | null;
    readonly " $refType": PartnerCard_artwork$ref;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "gravityID",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "PartnerCard_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sale",
      "storageKey": null,
      "args": null,
      "concreteType": "Sale",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "isBenefit",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "isGalleryAuction",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": "Partner",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "is_default_profile_public",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "type",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "href",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "initials",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "profile",
          "storageKey": null,
          "args": null,
          "concreteType": "Profile",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            (v0/*: any*/),
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "is_followed",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "icon",
              "storageKey": null,
              "args": null,
              "concreteType": "Image",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "url",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "locations",
          "storageKey": null,
          "args": null,
          "concreteType": "Location",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "city",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '31316e2f65e31a92dc50e6e04fabd6de';
export default node;
