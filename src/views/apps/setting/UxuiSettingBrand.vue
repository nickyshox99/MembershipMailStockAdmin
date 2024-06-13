<template>
<div>
    <b-row>
        <b-col md="4">
            <b-card title="On Page Setting">
                <b-form>
                    <b-row>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.Logopc" fluid thumbnail style="height: 50px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('Logopc')" ref="Logopc">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('Logopc')">
                                Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="logopc" label="Logo PC+MO (1040*250)">
                                <b-form-input id="logopc" v-model="localOptions.Logopc" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="title" label="Ttile">
                                <b-form-input id="title" v-model="localOptions.Title" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="description" label="Description">
                                <b-form-input id="description" v-model="localOptions.Description" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="marquee_text_header" label="Keyword SEO">
                                <b-form-input id="marquee_text_header" v-model="localOptions.marquee_text_header" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col cols="12">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-1 mr-1" @click="updateSetting">
                                Save changes
                            </b-button>

                        </b-col>
                    </b-row>
                </b-form>
            </b-card>
        </b-col>

        <b-col md="4">
            <b-card title="Contact Setting">
                <b-form>
                    <b-row>
                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.line_contact" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('line_contact')" ref="line_contact">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('line_contact')">
                            Upload
                            </b-button-->
                        </b-col>
                        <b-col md="12">
                            <b-form-group label-for="line_contact" label="Icon Contact">
                                <b-form-input id="line_contact" v-model="localOptions.line_contact" placeholder="" />                                
                            </b-form-group>
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="lineadd_fix" label="Line @ problem">
                                <b-form-input id="lineadd_fix" v-model="localOptions.lineadd_fix" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="lineadd_deposit" label="Line @ Deposit-Withdraw">
                                <b-form-input id="lineadd_deposit" v-model="localOptions.lineadd_deposit" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="line_contactz" label="Line contact">
                                <b-form-input id="line_contactz" v-model="localOptions.line_contactz" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="line_telno" label="Tel No">
                                <b-form-input id="line_telno" v-model="localOptions.line_telno" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col cols="12">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-1 mr-1" @click="updateSetting">
                                Save changes
                            </b-button>

                        </b-col>
                    </b-row>
                </b-form>
            </b-card>
        </b-col>

        <b-col md="4">
            <b-card title="Dashboard Setting 1">
                <b-form>
                    <b-row>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_logo" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_logo')" ref="member_logo">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_logo')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_logo" label="Icon Website">
                                <b-form-input id="member_logo" v-model="localOptions.member_logo" placeholder="" />
                            </b-form-group>
                        </b-col>


                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.icon1" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('icon1')" ref="icon1">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-1 mr-1"  @click="submitFile('icon1')">
                                Upload
                            </b-button-->
                        
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="icon1" label="Icon 1">
                                <b-form-input id="icon1" v-model="localOptions.icon1" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.icon2" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('icon2')" ref="icon2">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('icon2')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="icon2" label="Icon 2">
                                <b-form-input id="icon2" v-model="localOptions.icon2" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.icon3" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('icon3')" ref="icon3">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('icon3')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="icon3" label="Icon 3">
                                <b-form-input id="icon3" v-model="localOptions.icon3" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col cols="12">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-1 mr-1" @click="updateSetting">
                                Save changes
                            </b-button>

                        </b-col>
                    </b-row>
                </b-form>
            </b-card>
        </b-col>
    </b-row>

    <b-row>
        <b-col md="4">
            <b-card title="Dashboard Setting 2">
                <b-form>
                    <b-row>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_game_image" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_wallet_image')" ref="member_wallet_image">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_wallet_image')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_game_image" label="Icon Wallet">
                                <b-form-input id="member_game_image" v-model="localOptions.member_game_image" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_promotion_image" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_icon_credit')" ref="member_icon_credit">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_icon_credit')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_promotion_image" label="Icon Credit">
                                <b-form-input id="member_promotion_image" v-model="localOptions.member_promotion_image" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.icon_card2_4" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('icon_card2_4')" ref="icon_card2_4">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('icon_card2_4')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="icon_card2_4" label="Icon Log Out">
                                <b-form-input id="icon_card2_4" v-model="localOptions.icon_card2_4" placeholder="" />
                            </b-form-group>
                        </b-col>
                        
                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_icon_credit" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_icon_wheel')" ref="member_icon_wheel">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_icon_wheel')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_icon_credit" label="Menu Account">
                                <b-form-input id="member_icon_credit" v-model="localOptions.member_icon_credit" placeholder="" />
                            </b-form-group>
                        </b-col>
                        
                        <b-col cols="12">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-1 mr-1" @click="updateSetting">
                                Save changes
                            </b-button>

                        </b-col>
                    </b-row>
                </b-form>
            </b-card>
        </b-col>

        <b-col md="4">
            <b-card title="Dashboard Menu 1">
                <b-form>
                    <b-row>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_icon_deposit" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_icon_deposit')" ref="member_icon_deposit">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_icon_deposit')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_icon_deposit" label="Menu Deposit">
                                <b-form-input id="member_icon_deposit" v-model="localOptions.member_icon_deposit" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_icon_withdraw" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_icon_withdraw')" ref="member_icon_withdraw">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_icon_withdraw')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_icon_withdraw" label="Menu Promotion">
                                <b-form-input id="member_icon_withdraw" v-model="localOptions.member_icon_withdraw" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_icon_promotion" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_icon_promotion')" ref="member_icon_promotion">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_icon_promotion')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_icon_promotion" label="Menu Refund">
                                <b-form-input id="member_icon_promotion" v-model="localOptions.member_icon_promotion" placeholder="" />
                            </b-form-group>
                        </b-col>
                        
                        
                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_icon_history" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_icon_history')" ref="member_icon_history">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_icon_history')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_icon_history" label="Menu Refund">
                                <b-form-input id="member_icon_history" v-model="localOptions.member_icon_history" placeholder="" />
                            </b-form-group>
                        </b-col>
                        


                        <b-col cols="12">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-1 mr-1" @click="updateSetting">
                                Save changes
                            </b-button>

                        </b-col>
                    </b-row>
                </b-form>
            </b-card>
        </b-col>

        <b-col md="4">
            <b-card title="Dashboard Menu 2">
                <b-form>
                    <b-row>
                        
                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_icon_comis" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_icon_comis')" ref="member_icon_comis">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_icon_comis')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_icon_comis" label="Menu Card">
                                <b-form-input id="member_icon_comis" v-model="localOptions.member_icon_comis" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_icon_friend" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_icon_friend')" ref="member_icon_friend">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_icon_friend')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_icon_friend" label="Menu Wheel">
                                <b-form-input id="member_icon_friend" v-model="localOptions.member_icon_friend" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_icon_codefree" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_icon_codefree')" ref="member_icon_codefree">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_icon_codefree')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_icon_codefree" label="Menu Daily Deposit">
                                <b-form-input id="member_icon_codefree" v-model="localOptions.member_icon_codefree" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_icon_wheel" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_icon_wheel')" ref="member_icon_wheel">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_icon_wheel')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_icon_wheel" label="Menu Account">
                                <b-form-input id="member_icon_wheel" v-model="localOptions.member_icon_wheel" placeholder="" />
                            </b-form-group>
                        </b-col>
                        

                        <b-col cols="12">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-1 mr-1" @click="updateSetting">
                                Save changes
                            </b-button>

                        </b-col>
                    </b-row>
                </b-form>
            </b-card>
        </b-col>

    </b-row>

    <b-row>
        <b-col md="4">
            <b-card title="Footer Bar Button">
                <b-form>
                    <b-row>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_icon_Footer_4" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_icon_Footer_4')" ref="member_icon_Footer_4">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_icon_Footer_4')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_icon_Footer_4" label="Home Menu">
                                <b-form-input id="member_icon_Footer_4" v-model="localOptions.member_icon_Footer_4" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_icon_Footer_1" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_icon_Footer_1')" ref="member_icon_Footer_1">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_icon_Footer_1')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_icon_Footer_1" label="Menu Deposit">
                                <b-form-input id="member_icon_Footer_1" v-model="localOptions.member_icon_Footer_1" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_icon_Footer_3" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_icon_Footer_3')" ref="member_icon_Footer_3">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_icon_Footer_3')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_icon_Footer_3" label="Menu Play Game">
                                <b-form-input id="member_icon_Footer_3" v-model="localOptions.member_icon_Footer_3" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_icon_Footer_2" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_icon_Footer_2')" ref="member_icon_Footer_2">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_icon_Footer_2')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_icon_Footer_2" label="Menu Withdraw">
                                <b-form-input id="member_icon_Footer_2" v-model="localOptions.member_icon_Footer_2" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.member_icon_Footer_5" fluid thumbnail style="height: 30px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('member_icon_Footer_5')" ref="member_icon_Footer_5">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('member_icon_Footer_5')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="member_icon_Footer_5" label="Menu Contact">
                                <b-form-input id="member_icon_Footer_5" v-model="localOptions.member_icon_Footer_5" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col cols="12">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-1 mr-1" @click="updateSetting">
                                Save changes
                            </b-button>

                        </b-col>
                    </b-row>
                </b-form>
            </b-card>
        </b-col>

        <b-col md="8">
            <b-card title="Footer Bar Theme">
                <b-form>
                    <b-row>
                        <b-col md="12" style="padding:10px;">
                            <b-img :src="localOptions.background_image" fluid thumbnail style="height: 100px;" />
                            <!--br/>
                            <input type="file" @change="uploadFile('background_image')" ref="background_image">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="info" class="mt-1 mr-1"  @click="submitFile('background_image')">
                            Upload
                            </b-button-->
                        </b-col>

                        <b-col md="12">
                            <b-form-group label-for="background_image" label="Background (1920x1440)">
                                <b-form-input id="background_image" v-model="localOptions.background_image" placeholder="" />
                            </b-form-group>
                        </b-col>

                        <b-col md="2">
                            <b-form-group label-for="member_theme_button_22" label="Button 1 Color 1"  >
                                <v-swatches swatch-size="12" v-model="localOptions.member_theme_button_22" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection1" >
                                </v-swatches>
                                <b-form-input id="member_theme_button_22" v-model="localOptions.member_theme_button_22" placeholder="" @change="colorSelection1" />
                            </b-form-group>

                        </b-col>

                        <b-col md="2">
                            <b-form-group label-for="member_theme_button_11" label="Button 1 Color 2">
                                <v-swatches swatch-size="12" v-model="localOptions.member_theme_button_11" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection1" >
                                </v-swatches>
                                <b-form-input id="member_theme_button_11" v-model="localOptions.member_theme_button_11" placeholder="" @change="colorSelection1" />
                            </b-form-group>
                        </b-col>

                        <b-col md="2">
                            <b-form-group label-for="member_theme_button_3" label="Button 1 Border Color">
                                <v-swatches swatch-size="12" v-model="localOptions.member_theme_button_3" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection1" >
                                </v-swatches>
                                <b-form-input id="member_theme_button_3" v-model="localOptions.member_theme_button_3" placeholder="" @change="colorSelection1" />
                            </b-form-group>
                        </b-col>

                        <b-col md="2">
                            <b-form-group label-for="member_theme_button_text_11" label="Button 1 Text Color">
                              <v-swatches swatch-size="12" v-model="localOptions.member_theme_button_text_11" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection1" >
                                </v-swatches>
                                <b-form-input id="member_theme_button_text_11" v-model="localOptions.member_theme_button_text_11" placeholder="" @change="colorSelection1" />
                            </b-form-group>
                        </b-col>
                        <b-col md="2">
                          <b-form-group label-for="member_theme_button_text_11" label="Example Button 1">
                            <button :style="stylebutton1">
                              Login
                            </button>
                          </b-form-group>
                        </b-col>

                    </b-row>
                    
                    <b-row>                       
                        <b-col md="2">
                            <b-form-group label-for="member_theme_button_5" label="Button 2 Color 1"  >
                                <v-swatches swatch-size="12" v-model="localOptions.member_theme_button_5" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection2" >
                                </v-swatches>
                                <b-form-input id="member_theme_button_5" v-model="localOptions.member_theme_button_5" placeholder="" @change="colorSelection2" />
                            </b-form-group>

                        </b-col>

                        <b-col md="2">
                            <b-form-group label-for="member_theme_button_4" label="Button 2 Color 2">
                                <v-swatches swatch-size="12" v-model="localOptions.member_theme_button_4" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection2" >
                                </v-swatches>
                                <b-form-input id="member_theme_button_4" v-model="localOptions.member_theme_button_4" placeholder="" @change="colorSelection2" />
                            </b-form-group>
                        </b-col>

                        <b-col md="2">
                            <b-form-group label-for="member_theme_button_6" label="Button 2 Border Color">
                                <v-swatches swatch-size="12" v-model="localOptions.member_theme_button_6" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection2" >
                                </v-swatches>
                                <b-form-input id="member_theme_button_6" v-model="localOptions.member_theme_button_6" placeholder="" @change="colorSelection2" />
                            </b-form-group>
                        </b-col>

                        <b-col md="2">
                            <b-form-group label-for="member_theme_button_text_2" label="Button 2 Text Color">
                              <v-swatches swatch-size="12" v-model="localOptions.member_theme_button_text_2" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection2" >
                                </v-swatches>
                                <b-form-input id="member_theme_button_text_2" v-model="localOptions.member_theme_button_text_2" placeholder="" @change="colorSelection2" />
                            </b-form-group>
                        </b-col>
                        <b-col md="2">
                          <b-form-group label-for="member_theme_button_text_222" label="Example Button 2">
                            <button :style="stylebutton2">
                              Register
                            </button>
                          </b-form-group>
                        </b-col>

                    </b-row>

                    <b-row>                       
                        <b-col md="2">
                            <b-form-group label-for="member_theme_button_8" label="Button 3 Color 1"  >
                                <v-swatches swatch-size="12" v-model="localOptions.member_theme_button_8" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection3" >
                                </v-swatches>
                                <b-form-input id="member_theme_button_8" v-model="localOptions.member_theme_button_8" placeholder="" @change="colorSelection3" />
                            </b-form-group>

                        </b-col>

                        <b-col md="2">
                            <b-form-group label-for="member_theme_button_7" label="Button 3 Color 2">
                                <v-swatches swatch-size="12" v-model="localOptions.member_theme_button_7" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection3" >
                                </v-swatches>
                                <b-form-input id="member_theme_button_7" v-model="localOptions.member_theme_button_7" placeholder="" @change="colorSelection3" />
                            </b-form-group>
                        </b-col>

                        <b-col md="2">
                            <b-form-group label-for="member_theme_button_9" label="Button 3 Border Color">
                                <v-swatches swatch-size="12" v-model="localOptions.member_theme_button_9" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection3" >
                                </v-swatches>
                                <b-form-input id="member_theme_button_9" v-model="localOptions.member_theme_button_9" placeholder="" @change="colorSelection3" />
                            </b-form-group>
                        </b-col>

                        <b-col md="2">
                            <b-form-group label-for="member_theme_button_text_3" label="Button 3 Text Color">
                              <v-swatches swatch-size="12" v-model="localOptions.member_theme_button_text_3" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection3" >
                                </v-swatches>
                                <b-form-input id="member_theme_button_text_3" v-model="localOptions.member_theme_button_text_3" placeholder="" @change="colorSelection3" />
                            </b-form-group>
                        </b-col>
                        <b-col md="2">
                          <b-form-group label-for="member_theme_button_text_33" label="Example Button 3">
                            <button :style="stylebutton3">
                              Contact Us
                            </button>
                          </b-form-group>
                        </b-col>

                    </b-row>

                    <b-row>                       
                        <b-col md="2">
                            <b-form-group label-for="member_theme_bg_1" label="Background Color 1"  >
                                <v-swatches swatch-size="12" v-model="localOptions.member_theme_bg_1" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection4" >
                                </v-swatches>
                                <b-form-input id="member_theme_bg_1" v-model="localOptions.member_theme_bg_1" placeholder="" @change="colorSelection4" />
                            </b-form-group>

                        </b-col>

                        <b-col md="2">
                            <b-form-group label-for="member_theme_bg_2" label="Background Color 2">
                                <v-swatches swatch-size="12" v-model="localOptions.member_theme_bg_2" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection4" >
                                </v-swatches>
                                <b-form-input id="member_theme_bg_2" v-model="localOptions.member_theme_bg_2" placeholder="" @change="colorSelection4" />
                            </b-form-group>
                        </b-col>

                        <b-col md="2">
                            <b-form-group label-for="member_theme_bg_5" label="Background Color 3">
                                <v-swatches swatch-size="12" v-model="localOptions.member_theme_bg_5" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection4" >
                                </v-swatches>
                                <b-form-input id="member_theme_bg_5" v-model="localOptions.member_theme_bg_5" placeholder="" @change="colorSelection4" />
                            </b-form-group>
                        </b-col>

                        <b-col md="2">
                            <b-form-group label-for="member_theme_bg_3" label="Background Border Color">
                              <v-swatches swatch-size="12" v-model="localOptions.member_theme_bg_3" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection4" >
                                </v-swatches>
                                <b-form-input id="member_theme_bg_3" v-model="localOptions.member_theme_bg_3" placeholder="" @change="colorSelection4" />
                            </b-form-group>
                        </b-col>

                        <b-col md="2">
                            <b-form-group label-for="member_theme_bg_4" label="Background Shadow Color">
                              <v-swatches swatch-size="12" v-model="localOptions.member_theme_bg_4" show-fallback fallback-input-type="color" popover-x="right" row-length="8" @close="colorSelection4" >
                                </v-swatches>
                                <b-form-input id="member_theme_bg_4" v-model="localOptions.member_theme_bg_4" placeholder="" @change="colorSelection4" />
                            </b-form-group>
                        </b-col>

                        <b-col md="2">
                          <b-form-group label-for="member_theme_bg_44" label="Example Background">
                            <button :style="stylebutton4">
                              
                            </button>
                          </b-form-group>
                        </b-col>

                    </b-row>

                    <b-row>
                      <b-col cols="12">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mt-1 mr-1" @click="updateSetting">
                                Save changes
                            </b-button>

                        </b-col>
                    </b-row>

                </b-form>
            </b-card>
        </b-col>
    </b-row>
</div>
</template>

<script>
import {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BFormTextarea,
    BFormCheckbox,
    BFormSelect,
    BImg    
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
import Cleave from 'vue-cleave-component'
import axios from "axios";

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import VSwatches from 'vue-swatches'

import { mapActions } from "vuex";
import store from '@/store/index';

// Import the styles too, globally
import "vue-swatches/dist/vue-swatches.css"

export default {
    components: {
        BButton,
        BForm,
        BFormGroup,
        BFormInput,
        BRow,
        BCol,
        BCard,
        BFormTextarea,
        BFormCheckbox,
        vSelect,
        flatPickr,
        Cleave,
        BFormSelect,
        BImg,
        VSwatches,        
    },
    directives: {
        Ripple,
    },
    props: {
        settingData: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            localOptions: JSON.parse(JSON.stringify(this.settingData)),            
            stylebutton1 :"",
            stylebutton2 :"",
            stylebutton3 :"",
            stylebutton4 :"",
            tmpFileUpload:[],
        }
    },
    created() {
            this.stylebutton1 = {
              width :'100%',
              "border-radius" : "5px",
              padding : "5px 0",
              color : this.localOptions.member_theme_button_text_11,              
              background : "linear-gradient(180deg, "+ this.localOptions.member_theme_button_11+" 0%, "+this.localOptions.member_theme_button_22+" 100%)!important",
              border : "2px solid "+this.localOptions.member_theme_button_3,
              "font-weight": 400,
              "letter-spacing": "0.75px!important",
              "text-align" : "center",
            }  

            this.stylebutton2 = {
              width :'100%',
              "border-radius" : "5px",
              padding : "5px 0",
              color : this.localOptions.member_theme_button_text_2,              
              background : "linear-gradient(180deg, "+ this.localOptions.member_theme_button_5+" 0%, "+this.localOptions.member_theme_button_4+" 100%)!important",
              border : "2px solid "+this.localOptions.member_theme_button_6,
              "font-weight": 400,
              "letter-spacing": "0.75px!important",
              "text-align" : "center",
            }  

            this.stylebutton3 = {
              width :'100%',
              "border-radius" : "5px",
              padding : "5px 0",
              color : this.localOptions.member_theme_button_text_3,              
              background : "linear-gradient(180deg, "+ this.localOptions.member_theme_button_8+" 0%, "+this.localOptions.member_theme_button_7+" 100%)!important",
              border : "2px solid "+this.localOptions.member_theme_button_9,
              "font-weight": 400,
              "letter-spacing": "0.75px!important",
              "text-align" : "center",
            }  

            this.stylebutton4 = {
              width :'100%',
              height : "30px",
              "border-radius" : "5px",
              padding : "5px 0",
              color : this.localOptions.member_theme_button_text_3,              
              background : "linear-gradient(-51deg, "+ this.localOptions.member_theme_bg_5+" 0%, "+this.localOptions.member_theme_bg_1+", "+ this.localOptions.member_theme_bg_2+" 100%)!important",
              border : "1px solid "+this.localOptions.member_theme_bg_3+"!important",
              "box-shadow" : "0 0 5px "+ this.localOptions.member_theme_bg_4+ "!important"
            } 
            
    },       
    methods: {
        ...mapActions(["UploadFile"]),
        resetForm() {
            this.localOptions = JSON.parse(JSON.stringify(this.settingData))
        },
        colorSelection1() {
            this.stylebutton1 = {
              width :'100%',
              "border-radius" : "5px",
              padding : "5px 0",
              color : this.localOptions.member_theme_button_text_11,              
              background : "linear-gradient(180deg, "+ this.localOptions.member_theme_button_11+" 0%, "+this.localOptions.member_theme_button_22+" 100%)!important",
              border : "2px solid "+this.localOptions.member_theme_button_3,
              "font-weight": 400,
              "letter-spacing": "0.75px!important",
              "text-align" : "center",
            }     
        },
        colorSelection2() {
          this.stylebutton2 = {
              width :'100%',
              "border-radius" : "5px",
              padding : "5px 0",
              color : this.localOptions.member_theme_button_text_2,              
              background : "linear-gradient(180deg, "+ this.localOptions.member_theme_button_5+" 0%, "+this.localOptions.member_theme_button_4+" 100%)!important",
              border : "2px solid "+this.localOptions.member_theme_button_6,
              "font-weight": 400,
              "letter-spacing": "0.75px!important",
              "text-align" : "center",
            }     
        },
        colorSelection3() {
          this.stylebutton3 = {
              width :'100%',
              "border-radius" : "5px",
              padding : "5px 0",
              color : this.localOptions.member_theme_button_text_3,              
              background : "linear-gradient(180deg, "+ this.localOptions.member_theme_button_8+" 0%, "+this.localOptions.member_theme_button_7+" 100%)!important",
              border : "2px solid "+this.localOptions.member_theme_button_9,
              "font-weight": 400,
              "letter-spacing": "0.75px!important",
              "text-align" : "center",
            }      
        },
        colorSelection4() {
          this.stylebutton4 = {
              width :'100%',
              height : "30px",
              "border-radius" : "5px",
              padding : "5px 0",
              color : this.localOptions.member_theme_button_text_3,              
              background : "linear-gradient(-51deg, "+ this.localOptions.member_theme_bg_5+" 0%, "+this.localOptions.member_theme_bg_1+", "+ this.localOptions.member_theme_bg_2+" 100%)!important",
              border : "1px solid "+this.localOptions.member_theme_bg_3+"!important",
              "box-shadow" : "0 0 5px "+ this.localOptions.member_theme_bg_4+ "!important"
            }      
        },
        async updateSetting() {
            //const passwordCrypted = bcrypt.hash(user.get("password"),saltRounds);

            console.log("updateSetting");

            const userData = JSON.parse(localStorage.getItem('userData'));
            const formData = new FormData();

            var headers = {
                userid: userData.username,
                token: userData.token,
            }

            let tmp_localOptions = JSON.parse(JSON.stringify(this.localOptions));
            for (const [key, value] of Object.entries(tmp_localOptions)) {
                if (key.includes("enable")) {
                    tmp_localOptions[key] = value == true ? 1 : 0;
                }
            }

            var body = {

                id: 'brand_setting',
                value: tmp_localOptions,
            }

            let response;
            await axios.post("api/adminsetting/updateadminsettingbyid", body, {
                headers: {
                    'Content-Type': 'application/json',
                    'userid': headers.userid,
                    'token': headers.token,

                }
            }).then(
                resp => {
                    response = resp;
                }
            );

            // console.log(response);
            if (response.data.status == "success") {
                //

                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Update`,
                        icon: 'EditIcon',
                        variant: 'success',
                        text: `Update Succesful.`,
                    },
                    autoHideDelay: 3000,
                });

            } else {
                this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                        title: `Update`,
                        icon: 'TrashIcon',
                        variant: 'danger',
                        text: `Update UnSuccesful ${response.data.message}`,
                    },
                    autoHideDelay: 3000,
                });

            }

        },
        uploadFile(tmpName) {                        
            this.tmpFileUpload[tmpName] = this.$refs[tmpName].files[0]; 
        },
        async submitFile(tmpName) {                       
            console.log('submitFile');

            const userData = JSON.parse(localStorage.getItem('userData'));
            const formData = new FormData();

            formData.append("userid", userData.username);
            formData.append("token", userData.token);

            formData.append("file", this.tmpFileUpload[tmpName]);
            formData.append("tofilename", tmpName);

            // console.log(this.tmpFileUpload[tmpName]);

            const response = await this.UploadFile(formData);
            if (response.data.status == 'success') 
            {                  
                this.localOptions[tmpName] = response.data.url;
                this.updateSetting();
            }
            else {
                this.$toast(
                {
                    component: ToastificationContent,
                    props: {
                    title: response.data.message,
                    icon: 'EditIcon',
                    variant: 'error',
                    },
                });
            }
        }
    },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
