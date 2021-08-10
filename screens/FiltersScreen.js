import React, {useState, useEffect, useCallback} from 'react';
import {Platform, View, Text, StyleSheet, Switch} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';

const FiltersSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch 
                trackColor={{true: Colors.primaryColor}}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                value={props.state} 
                onValueChange={props.onChange}
            />
        </View>
    )
}

const FiltersScreen = props => {
    const {navigation} = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };
        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

    useEffect(() => {
        navigation.setParams({save: saveFilters});
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FiltersSwitch
                label="Gluten-free"
                state={isGlutenFree}
                onChange={setIsGlutenFree}
            />
            <FiltersSwitch
                label="Lactose-free"
                state={isLactoseFree}
                onChange={setIsLactoseFree}
            />
            <FiltersSwitch
                label="Vegan"
                state={isVegan}
                onChange={setIsVegan}
            />
            <FiltersSwitch
                label="Vegetarian"
                state={isVegetarian}
                onChange={setIsVegetarian}
            />
        </View>
    );
};

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: (() =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Menu"
                    iconName="ios-menu"
                    onPress={() => {navData.navigation.toggleDrawer()}}
                />
            </HeaderButtons>
        ),
        headerRight: (() =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Save"
                    iconName="ios-save"
                    onPress={navData.navigation.getParam('save')}
                />
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15
    }
});

export default FiltersScreen;