import { FairAllFollowedArtists_fair } from "__generated__/FairAllFollowedArtists_fair.graphql"
import { FairAllFollowedArtists_fairForFilters } from "__generated__/FairAllFollowedArtists_fairForFilters.graphql"
import { FairAllFollowedArtistsQuery } from "__generated__/FairAllFollowedArtistsQuery.graphql"
import { AnimatedArtworkFilterButton, ArtworkFilterNavigator, FilterModalMode } from "lib/Components/ArtworkFilter"
import { Aggregations, FilterArray, FilterParamName } from "lib/Components/ArtworkFilter/ArtworkFilterHelpers"
import { ArtworkFiltersStoreProvider } from "lib/Components/ArtworkFilter/ArtworkFilterStore"
import { defaultEnvironment } from "lib/relay/createEnvironment"
import { PlaceholderGrid, PlaceholderText } from "lib/utils/placeholders"
import { renderWithPlaceholder } from "lib/utils/renderWithPlaceholder"
import { Box, Flex, Separator, Spacer, Text } from "palette"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { FairArtworksFragmentContainer } from "./Components/FairArtworks"

interface FairAllFollowedArtistsProps {
  fair: FairAllFollowedArtists_fair
  fairForFilters: FairAllFollowedArtists_fairForFilters
}

export const FairAllFollowedArtists: React.FC<FairAllFollowedArtistsProps> = ({ fair, fairForFilters }) => {
  const [isFilterArtworksModalVisible, setFilterArtworkModalVisible] = useState(false)
  const handleFilterArtworksModal = () => {
    setFilterArtworkModalVisible(!isFilterArtworksModalVisible)
  }

  const initialFilter: FilterArray = [
    {
      displayText: "All Artists I Follow",
      paramName: FilterParamName.artistsIFollow,
      paramValue: true,
    },
  ]

  return (
    <ArtworkFiltersStoreProvider>
      <>
        <ScrollView>
          <Text mt={2} mb={1} textAlign="center" variant="mediumText">
            Artworks
          </Text>
          <Separator />
          <Spacer mb={2} />
          <Box px="15px">
            <FairArtworksFragmentContainer
              fair={fair}
              initiallyAppliedFilter={initialFilter}
              aggregations={fairForFilters.filterArtworksConnection?.aggregations as Aggregations}
              followedArtistCount={fairForFilters.filterArtworksConnection?.counts?.followedArtists}
            />
            <ArtworkFilterNavigator
              isFilterArtworksModalVisible={isFilterArtworksModalVisible}
              id={fair.internalID}
              slug={fair.slug}
              mode={FilterModalMode.Fair}
              exitModal={handleFilterArtworksModal}
              closeModal={handleFilterArtworksModal}
            />
          </Box>
        </ScrollView>
        <AnimatedArtworkFilterButton isVisible onPress={handleFilterArtworksModal} />
      </>
    </ArtworkFiltersStoreProvider>
  )
}

export const FairAllFollowedArtistsFragmentContainer = createFragmentContainer(FairAllFollowedArtists, {
  fair: graphql`
    fragment FairAllFollowedArtists_fair on Fair {
      internalID
      slug
      ...FairArtworks_fair
        @arguments(input: { includeArtworksByFollowedArtists: true, sort: "-decayed_merch", dimensionRange: "*-*" })
    }
  `,
  /**
   * Filter aggregations are normally dynamic according to applied filters.
   * Because of the `includeArtworksByFollowedArtists` argument used above, the artwork grid is intially scoped to only
   * include works by followed artists.
   * The filter options become incomplete if that option is later disabled in the filter menu.
   * To compensate, we are querying for the complete set below without the `includeArtworksByFollowedArtists`
   * argument so that the complete set of filters is available.
   */
  fairForFilters: graphql`
    fragment FairAllFollowedArtists_fairForFilters on Fair {
      filterArtworksConnection(
        first: 0
        aggregations: [COLOR, DIMENSION_RANGE, PARTNER, MAJOR_PERIOD, MEDIUM, PRICE_RANGE, FOLLOWED_ARTISTS, ARTIST]
      ) {
        aggregations {
          slice
          counts {
            count
            name
            value
          }
        }

        counts {
          followedArtists
        }
      }
    }
  `,
})

export const FairAllFollowedArtistsQueryRenderer: React.FC<{ fairID: string }> = ({ fairID }) => {
  return (
    <QueryRenderer<FairAllFollowedArtistsQuery>
      environment={defaultEnvironment}
      query={graphql`
        query FairAllFollowedArtistsQuery($fairID: String!) {
          fair(id: $fairID) @principalField {
            ...FairAllFollowedArtists_fair
          }

          fairForFilters: fair(id: $fairID) {
            ...FairAllFollowedArtists_fairForFilters
          }
        }
      `}
      variables={{ fairID }}
      render={renderWithPlaceholder({
        Container: FairAllFollowedArtistsFragmentContainer,
        renderPlaceholder: () => <FairAllFollowedArtistsPlaceholder />,
      })}
    />
  )
}

export const FairAllFollowedArtistsPlaceholder: React.FC = () => (
  <Flex>
    <Spacer mb={2} />
    <PlaceholderText width={220} />
    <Separator my={2} />
    {/* masonry grid */}
    <PlaceholderGrid />
  </Flex>
)
