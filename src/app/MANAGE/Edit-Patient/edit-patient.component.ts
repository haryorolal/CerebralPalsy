import { Component, OnInit, ViewChildren, QueryList, ElementRef, Input} from '@angular/core';
import { Ievent } from 'src/app/shared/cerebraapp-form.model'
import { DataService } from 'src/app/PATIENT/data.service';
import { UiService } from 'src/app/COMMON/ui.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPatientComponent } from '../dialog-patient/dialog-patient.component';
//import { FormGroup, NgForm } from '@angular/forms';
//import {MdbTablePaginationComponent, MdbTableDirective } from 'PATH-TO-MDB-ANGULAR-HERE';
declare var jQuery: any;

@Component({
    selector: 'edit-patient',
    templateUrl: './edit-patient.component.html',
    styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit{
    
    userDb: Ievent[];
    config: any;
    searchText: any;
    p: number = 1;
    dataSaved = false
    dataSave = false
    constructor( private dataS: DataService, private uiService: UiService, private dialog: MatDialog ){  }

    /*foundSessions: Ievent;
    Search(searchText){
        this.dataS.searchSessions(searchText).subscribe(sessions => {
            this.foundSessions = sessions;
            console.log(this.foundSessions);
        })
    }*/
    
    //collection of table data headers to display on table head from database
    headElements = [ '#', 'FullName',  'StudyNo',
   'HospitalNumber', 'Gender', 'DateOBirth', 'AgeAtFirstVisitToPNC ',
   'EthnicGroup',  'GeopoliticalZone',  'WithWhomDoesChildLive',
   'Informant'/*, 'AnyChangeInCaregiverSinceDiagnosis', 'IfYesWho',
   'Addreess', 'StateofResidence',  'PhoneNumber',  'EmailAddress ',  'DateOfEnrolment ',
   'DateFirstDiagnosedWithCerebralPalsy ',  'AgeAtWhichParentsFirstObservedDelaysInMilestones ',
   'AgeAtDiagnosisOfCerebralPalsyInMonths ',  'WhoMadeTheDiagnosisOfCerebralPalsy ',  'SourceOfReferral ',
   'PatternOfLimbInvolvment ',  'LimbsInvolved ',   'TypeOfCP ',  'IfSpasticIsItUnilateralOrBilateralSpasticCP ',
   'GmfcsClass ',  'IsChildReceivingPhysiotherapy ', 'FrequencyOfPhysioSessions ', 'AgeAtCommencementOfPhysio ',
   'DurarionOfPhysiotherapy ', 'AnyOrthopaedicInterventions ', 'IfYesTypeOfIntervention ',  'DoesChildHaveAnyAssistiveLocomotorDevice ',
   'IfYesWhoProvidedIt ', 'duration_of_pregnancy ',  'Term_Preterm ',  'types_of_conception ', 'if_assisted_which_type ',
   'complication_in_pregnancy ',   'IfYesGiveDetails ',  'country_of_birth ', 'type_of_pregnancy ', 'duration_of_labour ', 'mode_of_delivery ',
   'vacuum_extraction ', 'place_of_delivery ',  'Did_he_or_she_cry_immediately_after_birth ', 'any_active_resuscitation_at_birth ', 'birth_weight ',
   'time_to_first_feed_after_birth ',  'mode_of_feeding_after_birth ',  'Glucose_water ', 'any_NICU_admission ',  'reason_for_admission ',
   'duration_of_NICU_admission ',  'any_history_of_neonatal_seizures ', 'any_history_of_NNJ ',
   'If_yes_SBR_level ',  'treatment_given_for_NNJ ', 'any_history_suggestive_of_NN_Sepsis ',  'any_history_suggestive_of_NN_meningitis ',
   'any_history_of_metabolic_disorder_or_derangement ',  'any_major_illnesses_in_the_past ',
   'indication_for_hospital_admission ',  'age_at_illness ', 'duration_of_hospitalization ',   'was_admission_due_complication_of_CP ',
   'was_admission_related_to_the_etiology_of_CP ',  'any_previous_ICU_admission ', 'risk_factor_of_CP ',  'risk_for_CP_identified ',  'cranial_MRI_CT_scan ',
   'if_yes_give_results ',  'EEG ',   'if_yes_give_details ',   'severe_perinatal_asphyxia ',
   'NN_meningitis ',  'Bilirubin_encephalopathy ',  'exposure_to_radiation ', 'intrauterine_infection ',  'NN_Sepsis ',   'Maternal_pregnancy_complication ',
   'prolonged_rupture_of_membranes ',  'congenital_CNS_malformation ', 'any_other_congenital_malformation_state_type ',
   'maternal_drug_or_alcohol_exposure_state_type_of_drug ',  'prematurity ',  'low_birth_weight ',  'traumatic_delivery ',
   'intracranial_infection_metabolic_disorder_state_type ',   'metabolic_disorder_state_type ','traumatic_brain_injury ',   'hypoxic_brain_injury ', 
   'multi_Births ',  'stroke ',
   'give_details ',
   'any_other_state ',
   'prenatal_or_perinatal_or_postnatal ',
   'Presumed_cause_of_CP ',
   'for_postnatal_Cp_state_age_at_brain_injury ',
   'Does_a_child_have_a_comorbidities ',
   'Has_child_received_visual_assesment_by_ophthalmologist ',
   'Has_child_received_hearing_assessment ',
   'Visual_impairment ',
   'types_of_Visual_impairment ',
   'hearing_impairment ',
   'types_of_hearing_impairment ',
   'epilepsy ',
   'types_of_epilepsy ',  'speech_problems ',  'intellectual_disability ',   'Report_of_IQ_assessment ',
   'Autism_spectrum_disorder ',  'ADHD ',  'behaviour_problems ',  'feeding_difficulties ',
   'growth_impairment ',
   'microcephaly ',
   'head_circumference ',
   'medication_list_if_any ',
   'father_highest_level_of_education ',
   'father_occupation ',
   'mother__highest_level_of_education ',
   'mother_occupation ',
   'caregivers_if_not_parent_highest_level_of_education ',
   'caregivers_occupation ',
   'any_family_history_of_development_disorder_or_delay ',
   'Is_child_enrolled_in_the_school ',
   'types_of_school_not_school_age ',
   'Has_child_ever_repeated_a_class ',
   'immunisation_Status ',
   'Do_parents_have_concern_about_child_growth_and_weight ',
   'Do_parents_have_concern_about_childs_health ',
   'Do_parents_have_concern_about_child_eating_pattern ',
   'Does_child_take_longer_to_eat_milk_than_expected ',
   'is_child_able_to_eat_and_drink_efficiently ',
   'is_child_able_to_eat_and_drink_safely_without_choking ',
   'Is_the_feeding_experience_pleasant_for_the_child_and_family ',
   'Do_parent_have_to_prepare_food ',
   'What_are_the_childs_preferred_foods_list_as_necessary ',
   'Is_child_fluid_intake_adequate ',
   'Is_urine_output_a_adequate ',
   'Who_feeds_the_child_in_school ',
   'Who_feeds_the_child_when_parents_are_unavailable ',
   'How_is_child_positioned_for_feeding ',
   'How_frequently_does_child_feed_in_a_day ',
   'Does_this_child_have_difficulties_with_feeding ',
   'if_yes_which_type_of_feeding_difficulties ',
   'Is_this_child_able_to_feed_as_children_of_his_age ',
   'drooling ',
   'difficulty_with_swallowing ',
   'choking_on_feeds ',
   'Recurrent_aspiration ',
   'refusal_of_feeds ',
   'interest_in_some_food_types_only ',
   'inability_to_chew ',
   'Need_for_caregiver_assistance_to_feed ',
   'if_there_concern_with_feeding ',
   'how_does_illness_affect_childs_feeding ',
   'Has_the_child_experience_episodes_of_weight_loss_for_dehydration ',
   'does_the_child_take_any_caloric_protein_vitamins ',
   'weight_today ',
   'is_it_appropriate_for_age ',
   'If_yes_what_was_the_measured_length_or_height ',
   'Is_child_overweight_observe ',
   'Does_child_have_any_sign_of_faltering_growth ',
   'Did_caregiver_receive_any_special_education_from_the_health_care ',
   'has_child_ever_been_admitted_for_nutritional_rehabilitation ',
   'Has_child_been_admitted_at_any_time_in_the_hospital ',
   'if_yes_indication_for_admission_health_facility_and_duration ',
   'OFC_cm ',
   'age_OFC_cm ',
   'MUAC_cm ',
   'age_MUAC_cm ',
   'height_or_length ',
   'age_height_or_length ',
   'weight ',
   'age_weight ',
   'ulnar_length ',
   'age_ulnar_length ',
   'chest_circumference ',
   'age_chest_circumference ',
   'ofc_or_cc_ratio ',
   'age_ofcc_or_cc ',
   'z_score_weight ',
   'hair_colour ',
   'hair_texture ',
   'date_last_seen_in_the_PNC ',
   'age_at_last_visit_to_PNC ',
   'total_duration_of_follow_up ',
   'total_number_of_clinic_visits ',
   'Help_the_child_attended_the_PNC_in_the_last_one_year ',
   'Has_the_child_attended_the_pins_in_the_last_6_months ',
   'None ',
   'neck_control ',
   'independent_sitting ',
   'crawling ',
   'walking_with_Assistant ',
   'independent_walking ',
   'running ',
   'independent_climbing ',
   'other_Sporting_activities ',
   'telephone_contact_reached_on_phone ',
   'if_reached_phone_number ',
   'Alive_lives_with_parents ',
   'Alive_lives_in_an_industrial_home ',
   'Alive_lives_with_relation ',
   'Dead ',
   'state_age_at_death ',
   'independence_of_caregiver_assistance_for_daily_living ',
   'Required_assistant_for_daily_living ',
   'completely_dependent_on_caregiver_assistance '*/
    ];

    ngOnInit(){
        this.loadAllPatientsCP()
        //this.GetAllPatientMotor();
        //this.resetForm();
    }
  
    
    /*resetForm(f?: NgForm){
        if(f = null)
        f.resetForm();
    }*/


    loadAllPatientsCP(){
        this.dataS.getPatientsCP().subscribe(res => {
            this.userDb = res as Ievent[]
            //console.log(this.userDb);
        })
    }

    UpdatePatientToEdit(patient){
        let diaglogREf = this.dialog.open(DialogPatientComponent, {
            autoFocus: true,
            disableClose: true,
            width: "80%",
            height: "70%",
            data: {patient}
        })
        diaglogREf.afterClosed().subscribe(() =>{
            this.loadAllPatientsCP();            
        } )
        
             
       
    }

    DeleteUser(patientid: string){
        if(confirm("Are you sure you want to delete this user?")){
            this.dataS.DeleteUsers(patientid).subscribe(() => {
                this.dataSaved = true
                if(this.dataSaved){
                    this.showToast(this.dataSaved);
                }
            })
             
        }        
    }

    private showToast(dataSAved:boolean){
        if(dataSAved){
            this.uiService.showToast("Patient record Deleted Successfully")
        }
        if(this.dataSave){
            this.uiService.showToast("Patient record saved Successfully")
        }
    }
    

}
